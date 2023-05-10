(pwd() != @__DIR__) && cd(@__DIR__) # allow starting app from bin/ dir

using Src
const UserApp = Src
Src.main()
