module GetCurrent

using Genie.Renderer, ..FileUpload, ..TextUpdate

function handler()
	result = FileUpload.getCurrent()
	merge!(result, TextUpdate.getCurrent())
	Genie.WebChannels.unsubscribe_disconnected_clients()
	return Renderer.Json.JSONParser.json(result)
end

end
