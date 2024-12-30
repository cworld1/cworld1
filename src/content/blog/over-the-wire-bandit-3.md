---
title: 'Over the Wire - [01]Bandit (3)'
description: 'This is the article chapter 03 of the series "Over the Wire - [01]Bandit".'
publishDate: '2024-07-27'
updatedDate: '2024-07-27'
tags: ['Over the Wire', 'Bandit', 'Hacking Games', 'CTF', 'Linux']
language: 'English'
---

> This is the article chapter 02 of the series "Over the Wire - [01]Bandit". Checkout [Over the Wire - \[01\]Bandit (1)](/blog/over-the-wire-bandit-1) for more infomation.

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
