### Blog completo com node.js com ajuda do ChatGPT

- Remote: `git remote add origin https://github.com/mervy/node.js-blog-with-mongodb-chatgpt.git`

### Install mongodb in Arch Linux
- * https://www.geeksforgeeks.org/how-to-install-mongodb-on-arch-based-linux-distributionsmanjaro/ *
```bash
$ sudo pacman -S --needed base-devel git
$ git clone https://aur.archlinux.org/yay-git.git
$ cd yay-git
$ makepkg -sri
$ yay -S mongodb-bin
$ sudo systemctl start mongodb
```

