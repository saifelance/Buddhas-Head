export default class IntroScreen
{

	constructor(player)
	{
		let _this = this;

		this.cont = document.querySelector("#intro_screen");

		let progress_bar = this.cont.querySelector("label");

		let start_button = this.cont.querySelector("button");

		start_button.style.display = "none";

		// let toggle_fullscreen_screen_button = this.cont.querySelector(".toggle_fullscreen_screen_button");

		start_button.addEventListener("click", openMainScreen);
		// toggle_fullscreen_screen_button.addEventListener("click", toggleFullscreen);

		document.addEventListener("main_screen_loading", updateProgressBar);
		document.addEventListener("main_screen_ready", init);

		function updateProgressBar(event)
		{
			progress_bar.textContent = String(Math.round((event.detail.loaded / event.detail.total) * 100)) + "%";
		}

		function init(event)
		{
			progress_bar.style.display = "none";

			start_button.style.display = "";
		}

		function openMainScreen(event)
		{
			document.dispatchEvent(new CustomEvent("invoke_screen", { detail: { cur_screen: _this }}));
		}

		/*function toggleFullscreen(event)
		{
			document.dispatchEvent(new CustomEvent("toggle_fullscreen"));
		}*/

	}

}