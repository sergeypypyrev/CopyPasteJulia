module FileUpload

using Genie

currentName = ""
currentData = UInt8[]

function handler()
	global currentName, currentData
	payload = params(:payload)
	currentName = payload["fileName"]
	currentData = payload["fileData"]
	route = Genie.config.webchannels_default_route
	payload = getCurrent()
	except = params(Genie.Router.PARAMS_WS_CLIENT)
	Genie.WebChannels.broadcast(route, "FileUpload", payload, except = except)
end

function getCurrent() :: Dict
	global currentName, currentData
	return Dict("fileName" => currentName, "fileData" => currentData)
end

end
