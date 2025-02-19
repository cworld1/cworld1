---
title: 'Over the Wire - [01]Bandit (1)'
description: 'The Bandit wargame is aimed at absolute beginners. It will teach the basics needed to be able to play other wargames.'
publishDate: '2024-07-10'
updatedDate: '2024-07-10'
tags: ['Over the Wire', 'Bandit', 'Hacking Games', 'CTF', 'Linux']
language: 'English'
---

> Is only has great fun playing it by yourself. I'm here just to write a post recommend you try it and give some good solutions that tell you a new way to solve the problem.

Series content:

- [Over the Wire - \[01\]Bandit (1)](/blog/over-the-wire-bandit-1)
- [Over the Wire - \[01\]Bandit (2)](/blog/over-the-wire-bandit-2)
- [Over the Wire - \[01\]Bandit (3)](/blog/over-the-wire-bandit-3)

## You May Need to Know

### Wargames

The wargames offered by the OverTheWire community can help you to learn and practice security concepts in the form of fun-filled games.

### Bandit

The Bandit wargame is aimed at absolute beginners. It will teach the basics needed to be able to play other wargames.

**Note for beginners**

This game, like most other games, is organized in levels. You start at Level 0 and try to “beat” or “finish” it. Finishing a level results in information on how to start the next level. The pages on this website for “Level <X>” contain information on how to start level X from the previous level. E.g. The page for Level 1 has information on how to gain access from Level 0 to Level 1. All levels in this game have a page on this website, and they are all linked to from the side menu on the left of this page.

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
restricted so that users cannot snoop on each other. Files and directories
with easily guessable or short names will be periodically deleted! The /tmp
directory is regularly wiped.
Please play nice:

    * don't leave orphan processes running
    * don't leave exploit-files laying around
    * don't annoy other players
    * don't post passwords or spoilers
    * again, DON'T POST SPOILERS!
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
> By the way, the real passwords are at the bottom of the article of the last of this series.

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
