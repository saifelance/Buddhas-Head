import IntroScreen from "./screens/IntroScreen.js";
import MainScreen from "./screens/MainScreen.js";
import OutroScreen from "./screens/OutroScreen.js";
import ScreenManager from "./ScreenManager.js";
import Player from "./Player.js";

class App
{

	constructor()
	{
		let main_screen;
		let intro_screen;
		let outro_screen;
		let screen_manager;
		let player;

		if (document.readyState == "complete")
		{
			init();
		}
		else
		{
			window.addEventListener("load", init);
		}

		function init(event)
		{
			player = new Player(["assets/audio/gong_01.mp3", "assets/audio/bb-chap1-web.mp3", "assets/audio/bb-chap2-web.mp3"]);

			intro_screen = new IntroScreen(player);
			main_screen = new MainScreen(player);
			outro_screen = new OutroScreen(player);

			screen_manager = new ScreenManager([intro_screen, main_screen, outro_screen], intro_screen);

			window.setTimeout(() => screen_manager.init(), 500);

			document.addEventListener("invoke_screen", openScreen);
			document.addEventListener("toggle_fullscreen", toggleFullscreen);

			window.removeEventListener("load", init);
		}

		function openScreen(event)
		{
			let cur_screen = event.detail.cur_screen;

			if (cur_screen == intro_screen)
			{
				main_screen.activate();

				screen_manager.open(main_screen);
			}
			else if (cur_screen == main_screen)
			{
				outro_screen.setup();

				screen_manager.open(outro_screen);
			}
			else if (cur_screen == outro_screen)
			{
				main_screen.setup();

				screen_manager.open(main_screen);
			}
		}

		function toggleFullscreen(event)
		{
			if (!document.fullscreenElement)
			{
				document.documentElement.requestFullscreen();
			}
			else
			{
				if (document.exitFullscreen)
				{
					document.exitFullscreen();
				}
			}
		}

	}

}

new App();