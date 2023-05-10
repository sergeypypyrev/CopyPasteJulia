include("routes/Handlers.jl")
using Genie.Router, Genie.Assets, Genie.Renderer

route("/") do
	Assets.channels_support()
	serve_static_file("welcome.html")
end

channel("/__/TextUpdate", Handlers.TextUpdate.handler)
channel("/__/FileUpload", Handlers.FileUpload.handler)
channel("/__/GetCurrent", Handlers.GetCurrent.handler)
