# pfmon-heartbeat module for pfmon - Node.js monitoring utility for New Relic

[pfmon](https://github.com/portfolium/pfmon) is a modular monitoring utility for New Relic. 

**pfmon-heartbeat** will "ping" a TCP port on any host that is reachable from the host running this module.

## Requirements

* Node.js
* Install [pfmon](https://github.com/portfolium/pfmon)

## Installation

##### Install Install npm package

```
$ npm install pfmon-heartbeat --save
```

##### Add module(s) to config file

This module requires two properties in the module config (`pfmon-config.json `): 

* `duration` {Integer} - defines the time between "pings"
* `hosts` {Array} - array of host objects with `host` and `port` properties

```
	...
	},
    "modules": {
        "pfmon-heartbeat": {
            "duration": 60,
            "hosts": [
                {"host": "localhost", "port": 3000},
                {"host": "localhost", "port": 8000}
            ]
        }
    }
```

