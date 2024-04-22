export default class ScreenManager
{
	constructor(screens, first_screen)
	{
		let prev_screen = first_screen;
		let cur_screen = first_screen;
		let screen_hider = document.querySelector("#screen_hider");

		screens.forEach((screen) =>
		{
			if (screen != first_screen)
			{
				screen.cont.style.display = "none";
			}
		});

		this.init = function()
		{
			addScreen();
		}

		this.open = function(screen)
		{
			prev_screen = cur_screen;
			cur_screen = screen;

			screen_hider.style.display = "";

			new window.TinyTween({
				target: screen_hider.style,
				from: { opacity: 0 },
				to: { opacity: 1 },
				duration: 300,
				ease: "easeOutCubic",
				onComplete: addScreen
			});
		}

		function addScreen()
		{
			prev_screen.cont.style.display = "none";
			cur_screen.cont.style.display = "";

			new window.TinyTween({
				target: screen_hider.style,
				from: { opacity: 1 },
				to: { opacity: 0 },
				duration: 300,
				ease: "easeOutCubic",
				onComplete: removeScreenHider
			});
		}

		function removeScreenHider()
		{
			screen_hider.style.display = "none";
		}

	}

}