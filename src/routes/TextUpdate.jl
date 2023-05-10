module TextUpdate

using Genie

currentText = ""
function handler()
	global currentText
	currentText = params(:payload)
	router = Genie.config.webchannels_default_route
	payload = getCurrent()
	except = params(Genie.Router.PARAMS_WS_CLIENT)
	Genie.WebChannels.broadcast(router, "TextUpdate", payload, except = except)
	return ""
end

function getCurrent() :: Dict
	global currentText
	return Dict("text" => currentText)
end

end
