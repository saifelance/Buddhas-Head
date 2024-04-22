export default class Player
{

	constructor(tracks_urls)
	{
		this.is_playing = false;

		let audio = document.createElement("audio");

		audio.addEventListener("ended", audioEnded);

		this.play = function(data)
		{
			if (data !== undefined)
			{
				if (isNaN(data))
				{
					audio.src = data;
				}
				else
				{
					audio.src = tracks_urls[data];
				}
			}
			audio.play();

			this.is_playing = true;
		}

		this.pause = function()
		{
			audio.pause();

			this.is_playing = false;
		}

		function audioEnded(event)
		{
			document.dispatchEvent(new CustomEvent("audio_ended"));
		}

	}

}