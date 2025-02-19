---
title: 'Over the Wire - [01]Bandit (2)'
description: 'This is the article chapter 02 of the series "Over the Wire - [01]Bandit".'
publishDate: '2024-07-26'
updatedDate: '2024-07-26'
tags: ['Over the Wire', 'Bandit', 'Hacking Games', 'CTF', 'Linux']
language: 'English'
---

> This is the article chapter 02 of the series "Over the Wire - [01]Bandit". Checkout [Over the Wire - \[01\]Bandit (1)](/blog/over-the-wire-bandit-1) for more information.

## Level 14

The password for the next level is stored in /etc/bandit_pass/bandit14 and can only be read by user bandit14. For this level, you don’t get the next password, but you get a private SSH key that can be used to log into the next level. Note: localhost is a hostname that refers to the machine you are working on

```bash
ssh bandit14@localhost -p 2220 -i ./sshkey.private
cat /etc/bandit_pass/bandit14
```

Password: `MU4VWeTyJk8ROof1****************`

## Level 15

The password for the next level can be retrieved by submitting the password of the current level to port 30000 on localhost.

```bash
telnet localhost 30000
# MU4VWeTyJk8ROof1****************
```

Password: `8xCjnmgoKbGLhHFA****************`

## Level 16

The password for the next level can be retrieved by submitting the password of the current level to port 30001 on localhost using SSL encryption.

Helpful note: Getting “HEARTBEATING” and “Read R BLOCK”? Use -ign_eof and read the “CONNECTED COMMANDS” section in the manpage. Next to ‘R’ and ‘Q’, the ‘B’ command also works in this version of that command…

```bash
echo "8xCjnmgoKbGLhHFA****************" | openssl s_client -connect localhost:30001 -ign_eof
```

Password: `kSkvUpMQ7lBYyCM4****************`

## Level 17

The credentials for the next level can be retrieved by submitting the password of the current level to a port on localhost in the range 31000 to 32000. First find out which of these ports have a server listening on them. Then find out which of those speak SSL and which don’t. There is only 1 server that will give the next credentials, the others will simply send back to you whatever you send to it.

```bash
nmap -p31000-32000 localhost
# PORT      STATE SERVICE
# 31046/tcp open  unknown
# 31518/tcp open  unknown
# 31691/tcp open  unknown
# 31790/tcp open  unknown
# 31960/tcp open  unknown

# Way 1
openssl s_client localhost:31046 # bad
openssl s_client localhost:31518 # good
openssl s_client localhost:31691 # bad
openssl s_client localhost:31790 # good
openssl s_client localhost:31960 # bad

# Way 2
nmap localhost -sV -p 31046,31518,31691,31790,31960

echo "kSkvUpMQ7lBYyCM4****************" | openssl s_client -connect localhost:31518 -ign_eof
# Get the same we sent
echo "kSkvUpMQ7lBYyCM4****************" | openssl s_client -connect localhost:31790 -ign_eof
# Get the credential key

t=$(mktemp -d) && cd $t
touch sshkey.private
vim ./sshkey.private
# Paste it

chmod 600 ./sshkey.private
ssh bandit17@localhost -p 2220 -i ./sshkey.private
cat /etc/bandit_pass/bandit17
```

Password: `EReVavePLFHtFlFs****************`

## Level 18

There are 2 files in the homedirectory: passwords.old and passwords.new. The password for the next level is in passwords.new and is the only line that has been changed between passwords.old and passwords.new

NOTE: if you have solved this level and see ‘Byebye!’ when trying to log into bandit18, this is related to the next level, bandit19

```bash
diff passwords.old passwords.new

# Or
vimdiff passwords.old passwords.new
# vim -d passwords.old passwords.new
```

Password: `x2gLTTjFwMOhQ8oW****************`

## Level 19

The password for the next level is stored in a file readme in the homedirectory. Unfortunately, someone has modified .bashrc to log you out when you log in with SSH.

```bash
ssh bandit18@bandit.labs.overthewire.org -p 2220 "cat readme"
```

Password: `cGWpMaKXVwDUNgPA****************`

## Level 20

To gain access to the next level, you should use the setuid binary in the homedirectory. Execute it without arguments to find out how to use it. The password for this level can be found in the usual place (/etc/bandit_pass), after you have used the setuid binary.

```bash
cat /etc/bandit_pass/bandit20
# cat: /etc/bandit_pass/bandit20: Permission denied
./bandit20-do cat /etc/bandit_pass/bandit20
```

Password: `0qXahG8ZjOVMN9Gh****************`

## Level 21

There is a setuid binary in the homedirectory that does the following: it makes a connection to localhost on the port you specify as a commandline argument. It then reads a line of text from the connection and compares it to the password in the previous level (bandit20). If the password is correct, it will transmit the password for the next level (bandit21).

NOTE: Try connecting to your own network daemon to see if it works as you think

```bash
tmux
nc -lvp 12345

# Then split the window using Ctrl+b % / Ctrl+b "
./suconnect 12345

# Return to nc panel using Ctrl+b <arrow key> / Ctrl+b ; / Ctrl+b o
# Paste password: 0qXahG8ZjOVMN9Ghs7iOWsCfZyXOUbYO
```

Password: `EeoULMCra2q0dSkY****************`

## Level 22

A program is running automatically at regular intervals from cron, the time-based job scheduler. Look in /etc/cron.d/ for the configuration and see what command is being executed.

```bash
cd /etc/cron.d/
cat ./cronjob_bandit22
cat /usr/bin/cronjob_bandit22.sh
# #!/bin/bash
# chmod 644 /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
# cat /etc/bandit_pass/bandit22 > /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv

cat /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
```

Password: `tRae0UfB9v0UzbCd****************`

## Level 23

A program is running automatically at regular intervals from cron, the time-based job scheduler. Look in /etc/cron.d/ for the configuration and see what command is being executed.

NOTE: Looking at shell scripts written by other people is a very useful skill. The script for this level is intentionally made easy to read. If you are having problems understanding what it does, try executing it to see the debug information it prints.

```bash
cd /etc/cron.d/
cat ./cronjob_bandit23
cat /usr/bin/cronjob_bandit23.sh
# #!/bin/bash
#
# myname=$(whoami)
# mytarget=$(echo I am user $myname | md5sum | cut -d ' ' -f 1)
#
# echo "Copying passwordfile /etc/bandit_pass/$myname to /tmp/$mytarget"
#
# cat /etc/bandit_pass/$myname > /tmp/$mytarget
myname=bandit23
mytarget=$(echo I am user $myname | md5sum | cut -d ' ' -f 1)
echo "Copying passwordfile /etc/bandit_pass/$myname to /tmp/$mytarget"
cat /tmp/8ca319486bfbbc3663ea0fbe81326349
```

Password: `0Zf11ioIjMVN551j****************`

## Level 24

A program is running automatically at regular intervals from cron, the time-based job scheduler. Look in /etc/cron.d/ for the configuration and see what command is being executed.

NOTE: This level requires you to create your own first shell-script. This is a very big step and you should be proud of yourself when you beat this level!

NOTE 2: Keep in mind that your shell script is removed once executed, so you may want to keep a copy around…

```bash
cd /etc/cron.d/
cat ./cronjob_bandit24
cat /usr/bin/cronjob_bandit24.sh
# #!/bin/bash
#
# myname=$(whoami)
#
# cd /var/spool/$myname/foo
# echo "Executing and deleting all scripts in /var/spool/$myname/foo:"
# for i in * .*;
# do
#     if [ "$i" != "." -a "$i" != ".." ];
#     then
#         echo "Handling $i"
#         owner="$(stat --format "%U" ./$i)"
#         if [ "${owner}" = "bandit23" ]; then
#             timeout -s 9 60 ./$i
#         fi
#         rm -f ./$i
#     fi
# done

cd /var/spool/bandit24/foo

# Way 1
tmux
nc -lvp 12345
# New tab and write script
vim cworld.sh
# #!/bin/bash
#
# cat /etc/bandit_pass/bandit24 | nc localhost 12345
# Don't forget to give the permission (run it as fast as you can)
chmod +x cworld.sh

# Way 2
tmux
vim cworld.sh
# #!/bin/bash
#
# cat /etc/bandit_pass/bandit24 > /var/spool/bandit24/foo/cworld1
# Don't forget to give the permission (run it as fast as you can)
chmod +x cworld.sh
# New tab and get answer
cat /var/spool/bandit24/foo/cworld1
```

Password: `gb8KRRCsshuZXI0t****************`

## Level 25

A daemon is listening on port 30002 and will give you the password for bandit25 if given the password for bandit24 and a secret numeric 4-digit pincode. There is no way to retrieve the pincode except by going through all of the 10000 combinations, called brute-forcing.

You do not need to create new connections each time

```bash

t=$(mktemp -d) && cd $t

vim get-code.sh
#!/bin/bash

for i in {0000..9999} ; do
    echo gb8KRRCsshuZXI0tUuR6ypOFjiZbf3G8 $i >> possibilities.txt
done
echo 'File generated.'

cat possibilities.txt | nc localhost 30002 > result.txt
echo 'Test done.'
sort result.txt | grep -v "Wrong!"

chmod +x ./get-code.sh
./get-code.sh
# Sit back and relax
```

Password: `iCi86ttT4KSNe1ar****************`

## Level 26

Logging in to bandit26 from bandit25 should be fairly easy… The shell for user bandit26 is not /bin/bash, but something else. Find out what it is, how it works and how to break out of it.

```bash
ssh bandit26@localhost -p 2220 -i ./bandit26.sshkey
# Bad for this

cat /etc/passwd | grep "bandit26"
# bandit26:x:11026:11026:bandit level 26:/home/bandit26:/usr/bin/showtext

cat /usr/bin/showtext
# #!/bin/sh
#
# export TERM=linux
#
# exec more ~/text.txt
# exit 0

# It use command more, which will show percent if the window size is not enough to show all the text
# Set your terminal window height size very small, only contains 3 to 4 lines
ssh bandit26@localhost -p 2220 -i ./bandit26.sshkey

# As man manual shows:
# !command or :!command
#            Execute command in a subshell.
# v
#            Start up an editor at current line. The editor is taken from the environment variable VISUAL if defined,
#            or EDITOR if VISUAL is not defined, or defaults to vi(1) if neither VISUAL nor EDITOR is defined.

# Go to the vim and
# :e /etc/bandit_pass/bandit26

# Or
# :set shell=/bin/bash
# :shell
cat /etc/bandit_pass/bandit26
```

Password: `s0773xxkk0MXfdqO****************`
