---
title: '个人向 Nas 折腾记录'
description: '内含大量纯图一乐的折腾技巧'
publishDate: '2025-04-23'
tags: ['Radio', 'Exam']
draft: true
---

## 无线网卡上网

```
nmcli device status
lspci -k
sudo systemctl restart NetworkManager
```

```
ip route
default via 10.65.255.1 dev enp1s0 proto static metric 100
default via 192.168.43.1 dev wlx200db0449243 proto dhcp src 192.168.43.203 metric 600
10.65.255.1 dev enp1s0 proto static scope link metric 100
172.17.0.0/16 dev br-be1a5d2c2cd4 proto kernel scope link src 172.17.0.1 linkdown
172.31.0.0/16 dev docker0 proto kernel scope link src 172.31.0.1
192.168.1.0/24 dev enp1s0 proto kernel scope link src 192.168.1.1 metric 100
192.168.43.0/24 dev wlx200db0449243 proto kernel scope link src 192.168.43.203 metric 600
```

## 网络共享

为了对策校园网这种膈应人的产品，我决定将服务器的网络通过网线共享给我的 Windows 电脑，并由此摸索出了这样一套方案：

> 如果你也受困于校园网但是距离毕业尚早，请考虑购入二手路由并学习如何折腾。这会更加方便实用。

### 安装 & 配置静态 IP

```bash
sudo apt update
sudo apt install iptables dnsmasq
```

编辑 `/etc/network/interfaces` 文件：

```bash
sudo nano /etc/network/interfaces
```

确保 `enp1s0` 接口的配置为某个静态 IP：

```plaintext
auto enp1s0
iface enp1s0 inet static
    address 192.168.1.1
    netmask 255.255.255.0
```

然后重启服务以应用它。

```bash
sudo systemctl restart networking
```

> 值得一提的是，上述步骤可以使用飞牛自带的设置里面，使用图形化界面完成。

### 配置 DHCP 服务器

编辑 `/etc/dnsmasq.conf` 文件配置 DHCP 服务：

```plaintext
interface=enp1s0
dhcp-range=192.168.1.2,192.168.1.100,255.255.255.0,24h
```

这会类似于 DHCP 服务器，为你的电脑分配正确的 IP 地址。当然不要忘记重启 dnsmasq 服务：

```bash
sudo systemctl restart dnsmasq
```

### 配置 IP 转发

编辑 `/etc/sysctl.conf` 文件。不出意外的话你应该能找到注释好的配置。找到并取消注释（或添加）：

```plaintext
net.ipv4.ip_forward=1
```

然后应用更改即可：

```bash
sudo sysctl -p
```

### 配置防火墙规则

使用 `iptables` 设置 NAT 规则，以便通过 Wi-Fi 连接到互联网：

```bash
sudo iptables -t nat -A POSTROUTING -o wlx200db0449243 -j MASQUERADE
sudo iptables -A FORWARD -i wlx200db0449243 -o enp1s0 -m state --state RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i enp1s0 -o wlx200db0449243 -j ACCEPT
```

### Windows 配置

1. 将 Windows 电脑通过网线连接到服务器的 `enp1s0` 接口。
2. 理论上 Windows 电脑应该能够获取到一个被分配的 IP 地址（例如 192.168.1.2），并能够访问互联网。

### 注意事项

有时候电脑的休眠会让服务器触发某些特殊状态（当然也不排除是飞牛的锅），你可能需要在唤醒后手动执行：

```bash
sudo ip route del default via 10.65.255.1 dev enp1s0 proto static metric 100
```

当然也不一定是 `10.65.255.1`，按照 `ip route` 自行查看 default 是啥。

以及一些检查 IP 表的命令：

```bash
sudo iptables -L -v -n
sudo iptables -t nat -L -v -n
```

## 远程

这样的流量转发模式下，还想要外网 IP 地址访问 Windows 电脑，就需要在服务器上配置对应的端口转发。

### Windows 端配置

1. 在 Windows 电脑上，右键点击“此电脑”或“我的电脑”，选择“属性”。
2. 点击“远程设置”。
3. 在“远程”选项卡中，确保选中“允许远程连接到此计算机”。
4. 如果有防火墙提示，确保允许远程桌面通过防火墙。

确保 Windows 防火墙允许 RDP 连接：

1. 打开“控制面板”，选择“系统和安全”。
2. 点击“Windows 防火墙”。
3. 在左侧，点击“允许应用通过 Windows 防火墙”。
4. 确保“远程桌面”选项被勾选。

打开命令提示符（cmd）或 Pwsh，输入以下命令以获取其 IP 地址：

```bash
ipconfig
```

记下对应的 IP 地址。

### Debian 服务器配置

下面的情况将以这样的配置为例：

- Windows 电脑 IP 地址：192.168.1.2
- 默认 RDP 端口：3389

设立 iptables 转发：

```bash
sudo iptables -t nat -A PREROUTING -p tcp --dport 3389 -j DNAT --to-destination 192.168.1.2:3389
sudo iptables -A FORWARD -p tcp -d 192.168.1.2 --dport 3389 -m state --state NEW,RELATED,ESTABLISHED -j ACCEPT
```

### 连接到 Windows 电脑

1. 远程设备上打开远程桌面连接应用（比如微软官方的 Windows）。
2. 输入服务器的外网 IP 地址，格式为 `外网IP:3389`。然后点击连接开始享用！
