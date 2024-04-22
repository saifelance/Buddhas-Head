export default class OutroScreen
{

	constructor(player)
	{
		let _this = this;

		this.cont = document.querySelector("#outro_screen");

		let play_button = this.cont.querySelector(".play_button");
		let pause_button = this.cont.querySelector(".pause_button");
		let main_screen_button = this.cont.querySelector(".main_screen_button");
		let toggle_fullscreen_screen_button = this.cont.querySelector(".toggle_fullscreen_screen_button");

		if (!window.matchMedia("(any-pointer:coarse)").matches)
		{
			toggle_fullscreen_screen_button.addEventListener("click", toggleFullscreen);
		}
		else
		{
			toggle_fullscreen_screen_button.remove();
		}
		play_button.addEventListener("click", playAudio);
		pause_button.addEventListener("click", pauseAudio);
		main_screen_button.addEventListener("click", openMainScreen);

		this.setup = function()
		{
			if (player.is_playing)
			{
				play_button.style.display = "none";
				pause_button.style.display = "";
			}
			else
			{
				pause_button.style.display = "none";
				play_button.style.display = "";
			}
		}

		function playAudio(event)
		{
			player.play();

			play_button.style.display = "none";
			pause_button.style.display = "";
		}

		function pauseAudio(event)
		{
			player.pause();

			pause_button.style.display = "none";
			play_button.style.display = "";
		}

		function openMainScreen(event)
		{
			document.dispatchEvent(new CustomEvent("invoke_screen", { detail: { cur_screen: _this }}));
		}

		function toggleFullscreen(event)
		{
			document.dispatchEvent(new CustomEvent("toggle_fullscreen"));
		}

	}

}