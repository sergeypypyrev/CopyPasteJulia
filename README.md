# Features

Copy/paste files or text from one device to another.

# How to use

1. Download Julia from https://julialang.org/downloads/ and install.
1. Clone repository https://github.com/sergeypypyrev/CopyPasteJulia/.
1. Execute the following commands to install required packages (Unix-like OS assumed):
    ```
    cd /path/to/CopyPasteJulia/src
    julia
    julia> using Pkg
    julia> Pkg.instantiate()
    julia> exit()
    ```
1. Execute the following commands to launch CopyPasteJulia server:
    ```
    cd /path/to/CopyPasteJulia/src
    GENIE_ENV=prod ./bin/server
    ```
1. Open http://your-host-name:8000/ in several browsers (may be on different devices).

Now whenever user changes text or file in one browser - the same text or file will be available in all other browsers.
