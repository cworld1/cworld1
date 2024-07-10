---
title: 'Over the Wire (1) - Bandit'
description: 'The Bandit wargame is aimed at absolute beginners. It will teach the basics needed to be able to play other wargames.'
publishDate: '2024-07-10'
updatedDate: '2024-07-10'
tags: ['Over the Wire', 'Bandit', 'Hacking Games', 'CTF', 'Linux']
language: 'English'
---

> Is only has great fun playing it by yourself. I'm here just to write a post recommend you try it and give some good solutions that tell you a new way to solve the problem.

## You May Need to Know

### Wargames

The wargames offered by the OverTheWire community can help you to learn and practice security concepts in the form of fun-filled games.

### Bandit

The Bandit wargame is aimed at absolute beginners. It will teach the basics needed to be able to play other wargames.

**Note for beginners**

This game, like most other games, is organised in levels. You start at Level 0 and try to “beat” or “finish” it. Finishing a level results in information on how to start the next level. The pages on this website for “Level <X>” contain information on how to start level X from the previous level. E.g. The page for Level 1 has information on how to gain access from Level 0 to Level 1. All levels in this game have a page on this website, and they are all linked to from the sidemenu on the left of this page.

You will encounter many situations in which you have no idea what you are supposed to do. Don’t panic! Don’t give up! The purpose of this game is for you to learn the basics. Part of learning the basics, is reading a lot of new information. If you’ve never used the command line before, a good first read is this [introduction to user commands](https://man7.org/linux/man-pages/man1/intro.1.html).

There are several things you can try when you are unsure how to continue:

> First, if you know a command, but don’t know how to use it, try the manual ([man page](https://en.wikipedia.org/wiki/Man_page)) by entering man <command>. For example, man ls to learn about the “ls” command. The “man” command also has a manual, try it! When using man, press q to quit (you can also use / and n and N to search).
>
> Second, if there is no man page, the command might be a shell built-in. In that case use the “help <X>” command. E.g. help cd
>
> Also, your favorite search-engine is your friend. Learn how to use it! I recommend [Google](https://www.google.com/).

You’re ready to start! Begin with Level 0, linked at the left of this page. Good luck!

Note for VMs: You may fail to connect to overthewire.org via SSH with a “broken pipe error” when the network adapter for the VM is configured to use NAT mode. Adding the setting IPQoS throughput to /etc/ssh/ssh_config should resolve the issue. If this does not solve your issue, the only option then is to change the adapter to Bridged mode.

## Pre

--[ Playing the games ]--

This machine might hold several wargames.
If you are playing "somegame", then:

    * USERNAMES are somegame0, somegame1, ...
    * Most LEVELS are stored in /somegame/.
    * PASSWORDS for each level are stored in /etc/somegame_pass/.

Write-access to homedirectories is disabled. It is advised to create a
working directory with a hard-to-guess name in /tmp/. You can use the
command "mktemp -d" in order to generate a random and hard to guess
directory in /tmp/. Read-access to both /tmp/ is disabled and to /proc
restricted so that users cannot snoop on eachother. Files and directories
with easily guessable or short names will be periodically deleted! The /tmp
directory is regularly wiped.
Please play nice:

    * don't leave orphan processes running
    * don't leave exploit-files laying around
    * don't annoy other players
    * don't post passwords or spoilers
    * again, DONT POST SPOILERS!
      This includes writeups of your solution on your blog or website!

--[ Tips ]--

This machine has a 64bit processor and many security-features enabled
by default, although ASLR has been switched off. The following
compiler flags might be interesting:

    -m32                    compile for 32bit
    -fno-stack-protector    disable ProPolice
    -Wl,-z,norelro          disable relro

In addition, the execstack tool can be used to flag the stack as
executable on ELF binaries.

Finally, network-access is limited for most levels by a local
firewall.

--[ Tools ]--

For your convenience we have installed a few useful tools which you can find
in the following locations:

    * gef (https://github.com/hugsy/gef) in /opt/gef/
    * pwndbg (https://github.com/pwndbg/pwndbg) in /opt/pwndbg/
    * peda (https://github.com/longld/peda.git) in /opt/peda/
    * gdbinit (https://github.com/gdbinit/Gdbinit) in /opt/gdbinit/
    * pwntools (https://github.com/Gallopsled/pwntools)
    * radare2 (http://www.radare.org/)

--[ More information ]--

For more information regarding individual wargames, visit
http://www.overthewire.org/wargames/

For support, questions or comments, contact us on discord or IRC.

Enjoy your stay!

---

> !!! Attention !!!
>
> !!! Attention !!!
>
> !!! Attention !!!
>
> The next part will show you the answer of each level. If you have not tried yourself, it will decrease your interests.
>
> By the way, the real passwords are at the bottom of this article.

---

## Level 0

The goal of this level is for you to log into the game using SSH. The host to which you need to connect is bandit.labs.overthewire.org, on port 2220. The username is bandit0 and the password is bandit0. Once logged in, go to the Level 1 page to find out how to beat Level 1.

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Password: bandit0

## Level 1

The password for the next level is stored in a file called readme located in the home directory. Use this password to log into bandit1 using SSH. Whenever you find a password for a level, use SSH (on port 2220) to log into that level and continue the game.

Password: `ZjLjTmM6FvvyRnrb****************`

## Level 2

The password for the next level is stored in a file called - located in the home directory

```bash
cat ./-
```

Password: `263JGJPfgU6LtdEv****************`

## Level 3

The password for the next level is stored in a file called spaces in this filename located in the home directory

```bash
cat ./spaces\ in\ this\ filename
```

Password: `MNk8KNH3Usiio41P****************`

## Level 4

The password for the next level is stored in a hidden file in the inhere directory.

```bash
cat ./...Hiding-From-You
```

Password: `2WmrDFRmJIq3IPxn****************`

## Level 5

The password for the next level is stored in the only human-readable file in the inhere directory. Tip: if your terminal is messed up, try the “reset” command.

```bash
find -exec file {} \;
find . -type f -exec sh -c 'file "{}" | grep "ASCII" && cat "{}"' \;
```

Password: `4oQYVPkxZOOEOO5p****************`

## Level 6

The password for the next level is stored in a file somewhere under the inhere directory and has all of the following properties:

- human-readable
- 1033 bytes in size
- not executable

```bash
find . -type f -size 1033c
find . -type f -size 1033c -exec cat {} \;
find . -type f -size 1033c -exec file {} \; | grep "ASCII"
```

Password: `HWasnPhtq9AVKe0d****************`

## Level 7

The password for the next level is stored somewhere on the server and has all of the following properties:

- owned by user bandit7
- owned by group bandit6
- 33 bytes in size

```bash
find / -user bandit7 -type f -size 33c
find / -user bandit7 -type f -size 33c 2>/dev/null
find / -user bandit7 -group bandit6 -type f -size 33c 2>/dev/null
find / -user bandit7 -group bandit6 -type f -size 33c 2>/dev/null -exec cat {} \;
```

Password: `morbNTDkSW6jIlUc****************`

## Level 8

The password for the next level is stored in the file data.txt next to the word millionth

```bash
grep "millionth" data.txt

# Or
vim ./data.txt
# /millionth
```

Password: `dfwvzFQi4mU0wfNb****************`

## Level 9

The password for the next level is stored in the file data.txt and is the only line of text that occurs only once

```bash
sort ./data.txt | uniq -u
```

Password: `4CKMh1JI91bUIZZP****************`

## Level 10

The password for the next level is stored in the file data.txt in one of the few human-readable strings, preceded by several ‘=’ characters.

```bash
strings data.txt | grep "=="

# Or
vim ./data.txt
# /====
```

Password: `FGUW5ilLVJrxX9kM****************`

## Level 11

The password for the next level is stored in the file data.txt, which contains base64 encoded data

```bash
base64 -d ./data.txt
```

Password: `dtR173fZKb0RRsDF****************`

## Level 12

The password for the next level is stored in the file data.txt, where all lowercase (a-z) and uppercase (A-Z) letters have been rotated by 13 positions

```bash
cat ./data.txt | tr 'A-Za-z' 'N-ZA-Mn-za-m'
```

Password: `7x16WNeHIi5YkIhW****************`

## Level 13

The password for the next level is stored in the file data.txt, which is a hexdump of a file that has been repeatedly compressed. For this level it may be useful to create a directory under /tmp in which you can work. Use mkdir with a hard to guess directory name. Or better, use the command “mktemp -d”. Then copy the datafile using cp, and rename it using mv (read the manpages!)

```bash
t=$(mktemp -d) && cd $t
cp ~/data.txt .

# Dump hex to binaries
xxd -r data.txt reverse_data
file ./reverse_data

# Decompress gzip
mv ./reverse_data data-gzip.gz
gzip -dk ./data-gzip.gz
file ./data-gzip

# Decompress bzip2
mv ./data-gzip data-bzip2.bz2
bzip2 -dk ./data-bzip2.bz2
file ./data-bzip2

# Decompress gzip
mv ./data-bzip2 data-gzip-2.gz
gzip -dk ./data-gzip-2.gz
file ./data-gzip-2

# Decompress POSIX tar archive (GNU)
mv ./data-gzip-2 data-tar.tar
tar -xvf ./data-tar.tar
file ./data5.bin

# Decompress POSIX tar archive (GNU)
mv ./data5.bin data-tar-2.tar
tar -xvf ./data-tar-2.tar
file ./data6.bin

# Decompress bzip2
mv ./data6.bin data-bzip2-2.bz2
bzip2 -dk ./data-bzip2-2.bz2
file ./data-bzip2-2

# Decompress POSIX tar archive (GNU)
mv ./data-bzip2-2 data-tar-3.tar
tar -xvf ./data-tar-3.tar
file ./data8.bin

# Decompress gzip
mv ./data8.bin data-gzip-3.gz
gzip -dk ./data-gzip-3.gz
file ./data-gzip-3

# Get answer
cat ./data-gzip-3
```

Password: `FO5dwFsc0cbaIiH0****************`

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

## Level 27

Good job getting a shell! Now hurry and grab the password for bandit27!

```bash
./bandit27-do cat /etc/bandit_pass/bandit27
```

Password: `upsNCc7vzaRDx6oZ****************`

## Level 28

There is a git repository at ssh://bandit27-git@localhost/home/bandit27-git/repo via the port 2220. The password for the user bandit27-git is the same as for the user bandit27.

```bash
t=$(mktemp -d) && cd $t
git clone ssh://bandit27-git@localhost:2220/home/bandit27-git/repo
cd ./repo
cat ./README
```

Password: `Yz9IpL0sBcCeuG7m****************`

## Level 29

There is a git repository at ssh://bandit28-git@localhost/home/bandit28-git/repo via the port 2220. The password for the user bandit28-git is the same as for the user bandit28.

Clone the repository and find the password for the next level.

```bash
t=$(mktemp -d) && cd $t
git clone ssh://bandit28-git@localhost:2220/home/bandit28-git/repo
cd ./repo
cat ./README.md
# # Bandit Notes
# Some notes for level29 of bandit.
#
# ## credentials
#
# - username: bandit29
# - password: xxxxxxxxxx

git log --patch
```

Password: `4pT1t5DENaYuqnqv****************`

## Level 30

There is a git repository at ssh://bandit29-git@localhost/home/bandit29-git/repo via the port 2220. The password for the user bandit29-git is the same as for the user bandit29.

Clone the repository and find the password for the next level.

```bash
t=$(mktemp -d) && cd $t
git clone ssh://bandit29-git@localhost:2220/home/bandit29-git/repo
cd ./repo
cat ./README.md
# # Bandit Notes
# Some notes for bandit30 of bandit.
#
# ## credentials
#
# - username: bandit30
# - password: <no passwords in production!>

git branch -avv
git log --all --graph --patch
```

Password: `qp30ex3VLz5MDG1n****************`

## Level 31

There is a git repository at ssh://bandit30-git@localhost/home/bandit30-git/repo via the port 2220. The password for the user bandit30-git is the same as for the user bandit30.

Clone the repository and find the password for the next level.

```bash
t=$(mktemp -d) && cd $t
git clone ssh://bandit30-git@localhost:2220/home/bandit30-git/repo
cd ./repo
cat ./README.md
# just an epmty file... muahaha

git tag
git show secret
```

Password: `fb5S2xb7bRyFmAvQ****************`

## Level 32

There is a git repository at ssh://bandit31-git@localhost/home/bandit31-git/repo via the port 2220. The password for the user bandit31-git is the same as for the user bandit31.

Clone the repository and find the password for the next level.

```bash
t=$(mktemp -d) && cd $t
git clone ssh://bandit31-git@localhost:2220/home/bandit31-git/repo
cd ./repo
cat ./README.md
# This time your task is to push a file to the remote repository.
#
# Details:
#     File name: key.txt
#     Content: 'May I come in?'
#     Branch: master

git branch -avv
cat ./.gitignore
rm ./.gitignore

echo 'May I come in?' > key.txt
git status
git add .
git commit -m "feat: add key text"
git push
```

Password: `3O9RfhqyAlVBEZpV****************`

## Level 33

After all this git stuff, it’s time for another escape. Good luck!

```bash
ssh bandit31@bandit.labs.overthewire.org -p 2220
cat /etc/passwd | grep 32
# bandit32:x:11032:11032:bandit level 32:/home/bandit32:/home/bandit32/uppershell

# Login 32
# $0 allows you to show what script you are running (if no runs, it echo the shell)
# It is obvious that this uppershell file runs like 'sh -c "$0"'
# We can check it as:
$0ABC
# sh: 1: shABC: Permission denied

# The $0 means sh and have a lowercase.
$0
# Looks great

ls -la
# total 36
# drwxr-xr-x  2 root     root      4096 Jun 20 04:07 .
# drwxr-xr-x 70 root     root      4096 Jun 20 04:08 ..
# -rw-r--r--  1 root     root       220 Mar 31 08:41 .bash_logout
# -rw-r--r--  1 root     root      3771 Mar 31 08:41 .bashrc
# -rw-r--r--  1 root     root       807 Mar 31 08:41 .profile
# -rwsr-x---  1 bandit33 bandit32 15136 Jun 20 04:07 uppershell

# The shell binary uppershell has the permission from bandit33
cat /etc/bandit_pass/bandit33
```

Password: `tQdtbs5D5i2vJwkO****************`

## Level 34

At this moment, level 34 does not exist yet.

```bash
cat ./README.txt
# Congratulations on solving the last level of this game!
#
# At this moment, there are no more levels to play in this game. However, we are constantly working
# on new levels and will most likely expand this game with more levels soon.
# Keep an eye out for an announcement on our usual communication channels!
# In the meantime, you could play some of our other wargames.
#
# If you have an idea for an awesome new level, please let us know!
```

<!-- Password:  -->

## Passwords

All these passwords are encrypted by `tr` (13 positions), `gzip` and `xxd`. All the decrypt actions had appeared on the level solutions. Only when you have problem can you check this. It is updated on 2024-07-10.

```text
00000000: 1f8b 0808 303f 8e66 0003 7472 2e74 7874  ....0?.f..tr.txt
00000010: 003d d447 12a3 3a14 40d1 79af c24b 2007  .=.G..:.@.y..K .
00000020: cf08 2219 4c34 6946 3098 6072 5efd e777  ..".L4iF0.`r^..w
00000030: 999e 52a7 5412 f749 c150 0cfb 0dba dfda  ..R.T..I.P......
00000040: 26ea 971c fa13 fcfd 00df 6fda 1aac e211  &.........o.....
00000050: 1276 51d4 207a b7c8 7b64 1456 63c5 8658  .vQ. z..{d.Vc..X
00000060: 12dc 1d7f 12b9 df10 02f5 1c8f 1b27 8908  .............'..
00000070: f2de 2aa6 5191 e007 87d7 4d87 d087 5dfd  ..*.Q.....M...].
00000080: 247a bf85 cc46 f9cc 0b95 b265 8931 9803  $z...F.....e.1..
00000090: 9215 9b36 978e 55c0 edc2 7149 ec5c 5339  ...6..U...qI.\S9
000000a0: dea6 0d0e cf4d 5197 aba2 e1d9 84ce dc24  .....MQ........$
000000b0: 5062 cf36 ca78 3f89 df6f 58cc ab32 b755  Pb.6.x?..oX..2.U
000000c0: 1acb 5a2c 8b27 a242 c1b6 4ead d45e 3d1c  ..Z,.'.B..N..^=.
000000d0: 892f 7f92 b8df 5e4a 9345 dc9c a7f4 53f6  ./....^J.E....S.
000000e0: 07a8 3f36 0c8f aa1a 81ba 426a 08cb f949  ..?6......Bj...I
000000f0: f27e 3be2 77cb 88e6 2628 c4ea ee52 07d5  .~;.w...&(...R..
00000100: 07db 874d 10b1 bb2d 3f9b f527 a9fb ad1f  ...M...-?..'....
00000110: cbe2 6bf3 0b76 4850 3932 adcd 0e34 8895  ..k..vHP92...4..
00000120: 6c0b 8389 1cac ee27 e973 9f86 1fce b0e7  l......'.s......
00000130: d270 2bb9 9ac6 3dcc d469 a266 c7aa e239  .p+...=..i.f...9
00000140: 415e 78fd f9b3 85ed 480a beec 81ec bdab  A^x.....H.......
00000150: 07bd 856a 78ec 0c16 4e6d 3286 4b3a d417  ...jx...Nm2.K:..
00000160: 3d2b f539 8049 74d4 fc16 0220 336d c1c9  =+.9.It.... 3m..
00000170: 2604 2851 c2c8 2b9a 82f7 45cf 4c64 0513  &.(Q..+...E.Ld..
00000180: 0a33 bcdc 0557 3777 56b2 d176 d338 9e22  .3...W7wV..v.8."
00000190: 49ac 579a c72e 7a76 b259 bc2f edac 83ba  I.W...zv.Y./....
000001a0: b671 9717 3453 1e32 485b 8614 bd68 96cf  .q..4S.2H[...h..
000001b0: e8a2 67a8 50c2 6465 106b 6fa3 001b 8f70  ..g.P.de.ko....p
000001c0: 9a1e 9dce 35c1 4cee a6c1 15c2 45cf 5254  ....5.L.....E.RT
000001d0: 65ac d131 c57e eb04 f3cb 7e6a bb63 e1e2  e..1.~....~j.c..
000001e0: f1c1 4224 f73d 3ebe e899 6a13 b642 4a42  ..B$.=>...j..BJB
000001f0: 9edc 75b5 3642 ccd1 b9c2 2844 581f 1550  ..u.6B....(DX..P
00000200: 43e6 3528 f0d9 ca02 83dc 1403 17d8 afdc  C.5(............
00000210: deed 6c8d d0b9 fe86 7b21 7c84 6707 cc8b  ..l.....{!|.g...
00000220: 9eb1 2a64 0a44 71b5 cb90 9d79 2a56 9836  ..*d.Dq....y*V.6
00000230: 6450 02e1 fd6a 04a9 b3b3 173d 6b75 8e92  dP...j.....=ku..
00000240: 848d ff90 4b53 6226 ee29 7bad a27e 9c97  ....KSb&.){..~..
00000250: 1cd1 df1d 5da9 6bfa cf5a 50fa 6866 87d2  ....].k..ZP.hf..
00000260: 5656 0e19 da99 3372 6195 cc18 b5fa c14a  VV....3ra......J
00000270: ad7a ad8a 9cb5 ac21 9682 d078 3748 0af5  .z.....!...x7H..
00000280: c2a6 ae38 019b 0f32 838d 44ff b07a 7ed1  ...8...2..D..z~.
00000290: b356 0e9a 0192 469d 2e20 e9db 1a7d 4477  .V....F.. ...}Dw
000002a0: 2a34 f151 9fd1 8e8d 53fc 45cf 5a90 36c2  *4.Q....S.E.Z.6.
000002b0: f012 bb6b 2833 380e af0f d438 84dc 0fd4  ...k(38....8....
000002c0: 74dd 70cc 692e 7ad6 9a5a ca07 c0c8 b2f9  t.p.i.z..Z......
000002d0: a33d 5c28 973e 80a8 13d6 5e17 ad1d 51e7  .=\(.>....^...Q.
000002e0: dfb1 ce5a 8bb1 5044 9e8b 982f 3003 dcbc  ...Z..PD.../0...
000002f0: 0f7f 295b 9e39 7454 f538 34bd c605 396b  ..)[.9tT.84...9k
00000300: 6510 49a2 55b5 6d50 f818 fb94 1d39 20bf  e.I.U.mP.....9 .
00000310: e900 5d3d 5d62 2743 bbe8 59eb 9364 8cd1  ..]=]b'C..Y..d..
00000320: 91c5 b701 6645 c49a 4138 0b20 2c50 0e70  ....fE..A8. ,P.p
00000330: 1897 8e7e d1b3 96fa a5dd 2480 32bd 3386  ...~......$.2.3.
00000340: 8f43 1ef4 87b7 734a 6312 017b 69a0 632e  .C....sJc..{i.c.
00000350: faff dd4a 4438 c74d 8b69 d44f 1aa5 45d3  ...JD8.M.i.O..E.
00000360: ab19 1c5b 181f 18fd 7a78 e4f5 029d b5d2  ...[....zx......
00000370: 0485 860a 9583 2f1e 9a0e 1cd1 b01a 9762  ....../........b
00000380: 81f1 d44e 1aa6 165c f4ac 35b6 b880 542d  ...N...\..5...T-
00000390: d982 da3e 9e05 aff2 8e95 66ed 2cd7 5e3a  ...>......f.,.^:
000003a0: 47e6 750d d1b3 16ca d260 9cd3 fab9 cbba  G.u......`......
000003b0: a525 724b 04aa 9067 b316 a7b1 50e1 fe45  .%rK...g....P..E
000003c0: cf5a 39df e76d 869b f882 145e b9b1 d461  .Z9..m.....^...a
000003d0: d5aa 558b 01b5 7ce3 c183 fefc 0782 807b  ..U...|........{
000003e0: b593 0500 00                             .....
```
