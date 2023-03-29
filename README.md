# Tor Hidden Service Hosting Using Node.js

## Important Files

### `.torrc` 
Your all general configurations for the tor (Same as `/etc/tor/torrc` in other linux platforms)

### `run.sh`

The Bash Script That Runs everything i.e. Tor Service and the Node.js server

### `tor` Folder

The Folder That is the Container for the Hidden Service. (Same as `/var/lib/tor/` in other linux platforms)

### `.replit`
The Replit Config File. Configs things like the `run` button etc.

### `.replit.nix`
The nix file that contains the packages to includes

## Services Installed

* `Node.js` - `v16.x.x`
* `npm` - `v8.x.x`
* `tor` - `vx.x.x`

## Get The Domain Name

Tor Automatically generates a `.onion` domain for you and it is a random `56` character long string. Though you can customize it but thats another story.

The Domain Name is stored in the `tor/hidden-service/hostname` file. You can `cat` it to get the domain.

Or just run the `domain.sh` script:
```bash
bash domain.sh
```