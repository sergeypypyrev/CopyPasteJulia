module GetCurrent

using Genie.Renderer, ..FileUpload, ..TextUpdate

function handler()
	result = FileUpload.getCurrent()
	merge!(result, TextUpdate.getCurrent())
	return Renderer.Json.JSONParser.json(result)
end

end
