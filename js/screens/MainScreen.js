import NavigationController from "../NavigationController.js";
import OrbitController from "../OrbitController.js";

export default class MainScreen
{

	constructor(player)
	{
		let _this = this;

		let scene;
		let camera;
		let def_camera_position;
		let def_camera_rotation;
		let current_controller;
		let orbit_controller;
		let navigation_controller;
		let renderer;
		let ground;
		let head;
		let head_part2;
		let angkor;
		let sphere1;
		let sphere2;
		let models_loading_progress;
		let selected_model;
		let state;
		let models = [];
		let zero_v = new THREE.Vector3();
		let mouse_pos = new THREE.Vector2();
		let raycaster;
		this.cont = document.querySelector("#main_screen");
		let camera_is_moving;
		let shader_frog_runtime;
		let shader_frog_clock;

		const MODEL_FOCUS_IN_DURATION = 1;
		const ROTATION_SPEED = 0.002;

		const IDLE = 1;
		const PLAYING_SONG = 2;

		state = IDLE;

		shader_frog_runtime = new ShaderFrogRuntime();

		shader_frog_clock = new THREE.Clock();

		let play_button = this.cont.querySelector(".play_button");
		let pause_button = this.cont.querySelector(".pause_button");
		let outro_screen_button = this.cont.querySelector(".outro_screen_button");
		let lobby_screen_button = this.cont.querySelector(".lobby_screen_button");
		let toggle_fullscreen_screen_button = this.cont.querySelector(".toggle_fullscreen_screen_button");

		if (!window.matchMedia("(any-pointer:coarse)").matches)
		{
			toggle_fullscreen_screen_button.addEventListener("click", toggleFullscreen);
		}
		else
		{
			toggle_fullscreen_screen_button.remove();
		}
		lobby_screen_button.style.display = "none";

		setupWorld();
		setupScene();
		setupControllers();
		setupModels();
		update();

		play_button.addEventListener("click", playAudio);
		pause_button.addEventListener("click", pauseAudio);
		outro_screen_button.addEventListener("click", openOutroScreen);
		lobby_screen_button.addEventListener("click", revertToLobby);

		this.activate = function()
		{
			playAudio(0);

			current_controller.activate();
		}

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

		function playAudio(data)
		{
			player.play((data instanceof Event) ? undefined : data);

			play_button.style.display = "none";
			pause_button.style.display = "";
		}

		function pauseAudio(event)
		{
			player.pause();

			pause_button.style.display = "none";
			play_button.style.display = "";
		}

		function openOutroScreen(event)
		{
			document.dispatchEvent(new CustomEvent("invoke_screen", { detail: { cur_screen: _this }}));
		}

		function setupWorld()
		{
			scene = new THREE.Scene();

			camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);

			scene.add(camera);

			shader_frog_runtime.registerCamera(camera);

			def_camera_position = new THREE.Vector3(0, -38.5053964150492, 3.4281463943465633);
			def_camera_rotation = new THREE.Vector3(1.5389960091929478, -0.02672234416349403, 0);

			camera.position.copy(def_camera_position);
			camera.rotation.set(def_camera_rotation.x, def_camera_rotation.y, def_camera_rotation.z);
			camera.up = new THREE.Vector3(0, 0, 1);

			renderer = new THREE.WebGLRenderer({
				canvas: _this.cont.querySelector("#main_screen_canvas"),
				antialias: true
			});

			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap;
			renderer.outputEncoding = THREE.sRGBEncoding;

			renderer.setSize(window.innerWidth, window.innerHeight);

			raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 1, 0), 0);

			window.addEventListener("resize", updateLayout);



			window.addEventListener("keydown",
					function(event)
					{
						if (event.key.toLowerCase() == "c")
						{
							console.log("camera.position.set(" + camera.position.x + ", " + camera.position.y + ", " + camera.position.z + ");" + "\n" + "camera.rotation.set(" + camera.rotation.x + ", " + camera.rotation.y + ", " + camera.rotation.z + ");");

							console.log(current_controller.controls.target)
						}
					});

		}

		function setupScene()
		{
			let spot_light1 = new THREE.SpotLight(0xffffff, 1);

			spot_light1.position.set(-5, 2, 1);
			spot_light1.angle = Math.PI / 2;
			spot_light1.penumbra = 0.3;
			spot_light1.decay = 1;
			spot_light1.distance = 70;

			spot_light1.castShadow = true;
			spot_light1.shadow.mapSize.width = 512;
			spot_light1.shadow.mapSize.height = 512;
			spot_light1.shadow.camera.near = 0.5;
			spot_light1.shadow.camera.far = 500;
			spot_light1.shadow.focus = 10;

			scene.add(spot_light1);

			let spot_light2 = new THREE.SpotLight(0xffffff, spot_light1.intensity);

			spot_light2.position.set(spot_light1.position.x * -1, spot_light1.position.y, spot_light1.position.z);
			spot_light2.angle = spot_light1.angle;
			spot_light2.penumbra = spot_light1.penumbra;
			spot_light2.decay = spot_light1.decay;
			spot_light2.distance = spot_light1.distance;

			spot_light2.castShadow = spot_light1.castShadow;
			spot_light2.shadow.mapSize.width = spot_light1.shadow.mapSize.width;
			spot_light2.shadow.mapSize.height = spot_light1.shadow.mapSize.height;
			spot_light2.shadow.camera.near = spot_light1.shadow.camera.near;
			spot_light2.shadow.camera.far = spot_light1.shadow.camera.far;
			spot_light2.shadow.focus = spot_light1.shadow.focus;

			scene.add(spot_light2);

			let spot_light3 = new THREE.SpotLight(0xffffff, 1);

			spot_light3.position.set(0, -3, 3);
			spot_light3.angle = Math.PI / 2;
			spot_light3.penumbra = spot_light1.penumbra;
			spot_light3.decay = spot_light1.decay;
			spot_light3.distance = spot_light1.distance;

			spot_light3.castShadow = spot_light1.castShadow;
			spot_light3.shadow.mapSize.width = spot_light1.shadow.mapSize.width;
			spot_light3.shadow.mapSize.height = spot_light1.shadow.mapSize.height;
			spot_light3.shadow.camera.near = spot_light1.shadow.camera.near;
			spot_light3.shadow.camera.far = spot_light1.shadow.camera.far;
			spot_light3.shadow.focus = spot_light1.shadow.focus;

			scene.add(spot_light3);

			/*scene.add(new THREE.SpotLightHelper(spot_light1));
			scene.add(new THREE.CameraHelper(spot_light1.shadow.camera));

			scene.add(new THREE.SpotLightHelper(spot_light2));
			scene.add(new THREE.CameraHelper(spot_light2.shadow.camera));

			scene.add(new THREE.SpotLightHelper(spot_light3));
			scene.add(new THREE.CameraHelper(spot_light3.shadow.camera));*/

		}

		function setupModels()
		{
			let head_material1 = new THREE.MeshStandardMaterial({
				roughness: 0.6,
				wireframe: true,
				side: THREE.DoubleSide
			});

			let head_material2 = new THREE.MeshBasicMaterial({ color: 0xFF00FF });

			let angkor_material = new THREE.MeshStandardMaterial({
				color: 0x555555,
				roughness: 0.6,
				wireframe: true,
				side: THREE.DoubleSide
			});

			let ground_material = new THREE.MeshStandardMaterial();

			let sphere1_temp_material = new THREE.MeshPhysicalMaterial({
				color: 0xFFFFFF,
				emissive: 0,
				reflectivity: 1,
				roughness: 0,
				metalness: 0.93,
				clearcoat: 1,
				side: THREE.DoubleSide,
				opacity: 0.54,
				transparent: true,
				alphaTest: 0.06,
				depthTest: true,
				depthWrite: true
			});

			let sphere2_temp_material = new THREE.MeshPhysicalMaterial({
				color: 0xFFFFFF,
				emissive: 0,
				reflectivity: 1,
				roughness: 0,
				metalness: 0.93,
				clearcoat: 1,
				side: THREE.DoubleSide,
				opacity: 0.54,
				transparent: true,
				alphaTest: 0.06,
				depthTest: true,
				depthWrite: true
			});

			ground = new THREE.Mesh(new THREE.PlaneGeometry(10000, 10000, 100, 100), ground_material);
			//ground.rotation.x = -Math.PI / 2;
			ground.position.z = -3;
			scene.add(ground);

			sphere1 = new THREE.Mesh(new THREE.SphereGeometry(13, 48, 32), sphere1_temp_material);
			scene.add(sphere1);

			sphere2 = new THREE.Mesh(new THREE.SphereGeometry(16, 48, 32), sphere2_temp_material);
			scene.add(sphere2);

			navigation_controller.addObject(ground);

			const obj_loader = new THREE.OBJLoader();
			const texture_loader = new THREE.TextureLoader();

			models_loading_progress = { loaded: [], total: [] };

			Promise.all([
				obj_loader.loadAsync("assets/models/head/head.obj", (event) => updateProgressBar(event, 0)),
				obj_loader.loadAsync("assets/models/angkor/angkor.obj", (event) => updateProgressBar(event, 1)),
				// obj_loader.loadAsync("assets/models/angkor/AngkorWatSite 3D.obj", (event) => updateProgressBar(event, 1)),
				texture_loader.loadAsync("assets/models/head/diffuse_texture.jpg", (event) => updateProgressBar(event, 2)),
				texture_loader.loadAsync("assets/models/ground/Ground_Wet_Rocks_002_basecolor.jpg", (event) => updateProgressBar(event, 3)),
				texture_loader.loadAsync("assets/models/ground/Ground_Wet_Rocks_002_normal.jpg", (event) => updateProgressBar(event, 4)),
				texture_loader.loadAsync("assets/models/ground/Ground_Wet_Rocks_002_ambientOcclusion.jpg", (event) => updateProgressBar(event, 5)),
				texture_loader.loadAsync("assets/models/ground/Ground_Wet_Rocks_002_roughness.jpg", (event) => updateProgressBar(event, 6))
			]).then(data =>
			{
				head = new THREE.Group();

				head.audio_id = 1;

				head.sphere = sphere1;

				let head_part1 = data[0].children[0];

				let diffuse_map = data[2];

				diffuse_map.encoding = THREE.sRGBEncoding;

				head_material1.map = diffuse_map;

				head_material1.map.wrapS = THREE.RepeatWrapping;

				head_part1.material = head_material1;

				head_part1.rotation.x = Math.PI / 2;
				head_part1.rotation.y = Math.PI / 12;
				//head.position.x -= size.x / 2;
				//head.position.y -= size.y / 2;
				//head.position.z -= size.z / 2;

				head_part1.position.x = 0.2;
				head_part1.position.y = 2;
				head_part1.position.z = -2;

				head.add(head_part1);

				head_part2 = head_part1.clone();

				head_part2.material = head_material2;

				head_part2.position.y = head_part1.position.y + 0.1;

				head.position.x = -15;

				head.add(head_part2);

				head.def_position = Object.assign({}, head.position);
				head.focused_camera_position = new THREE.Vector3(0.04705484996556114, -12.029173746239294, 2.9327926975777796);
				head.focused_camera_target_position = new THREE.Vector3(0.035851377656731305, 0.1501386785179129, 0.6152351887047028);
				head.focused_camera_rotation = new THREE.Vector3(1.382757974157833, 0.0009036621532022624, 0.0001719545923384852);

				models.push(head);

				scene.add(head);

				angkor = data[1].children[0];

				angkor.audio_id = 2;

				angkor.sphere = sphere2;

				angkor.material = angkor_material;

				angkor.scale.set(0.4, 0.4, 0.4);
				angkor.rotation.x = Math.PI / 2;
				angkor.position.x = 7;
				angkor.position.z -= 2;

				angkor.def_position = Object.assign({}, angkor.position);
				angkor.focused_camera_position = new THREE.Vector3(0.7791987417913152, -15.488949278591264, 0.3085232806045406);
				angkor.focused_camera_target_position = new THREE.Vector3(-0.021439581666074948, 0.08728617318824601, -0.5162077414217627);
				angkor.focused_camera_rotation = new THREE.Vector3(1.517897690994109, 0.05128436397810096, 0.0027142093736801302);

				models.push(angkor);

				scene.add(angkor);

				diffuse_map = data[3];

				diffuse_map.encoding = THREE.sRGBEncoding;
				diffuse_map.wrapS = THREE.RepeatWrapping;
				diffuse_map.wrapT = THREE.RepeatWrapping;
				diffuse_map.repeat.set(1000, 1000);

				ground_material.map = diffuse_map;

				let normal_map = data[4];

				normal_map.encoding = THREE.sRGBEncoding;
				normal_map.wrapS = THREE.RepeatWrapping;
				normal_map.wrapT = THREE.RepeatWrapping;
				normal_map.repeat.copy(diffuse_map.repeat);

				ground_material.normalMap = normal_map;

				let ao_map = data[5];

				ao_map.encoding = THREE.sRGBEncoding;
				ao_map.wrapS = THREE.RepeatWrapping;
				ao_map.wrapT = THREE.RepeatWrapping;
				ao_map.repeat.copy(diffuse_map.repeat);

				ground_material.aoMap = ao_map;

				let roughness_map = data[6];

				roughness_map.encoding = THREE.sRGBEncoding;
				roughness_map.wrapS = THREE.RepeatWrapping;
				roughness_map.wrapT = THREE.RepeatWrapping;
				roughness_map.repeat.copy(diffuse_map.repeat);

				ground_material.roughnessMap = roughness_map;

				ground_material.needsUpdate = true;

				sphere1.position.copy(head.position);
				sphere2.position.copy(angkor.position);

				shader_frog_runtime.load("assets/shaders/sphere1.json", function(shader_data)
				{
					sphere1.material = shader_frog_runtime.get(shader_data.name);
					sphere2.material = shader_frog_runtime.get(shader_data.name);
				});

				current_controller = navigation_controller;

				render();

				document.dispatchEvent(new CustomEvent("main_screen_ready"));

				document.addEventListener("audio_ended", revertToLobby);

				renderer.domElement.addEventListener("click", selectModel);
			});
		}

		function updateProgressBar(event, id)
		{
			models_loading_progress.loaded[id] = event.loaded;
			models_loading_progress.total[id] = event.total;

			let loaded = 0;
			let total = 0;

			models_loading_progress.loaded.forEach((value) => loaded += value);
			models_loading_progress.total.forEach((value) => total += value);

			document.dispatchEvent(new CustomEvent("main_screen_loading", { detail: { loaded: loaded, total: total }}));
		}

		function setupControllers()
		{
			navigation_controller = new NavigationController(_this.cont, scene, camera, renderer.domElement);
			orbit_controller = new OrbitController(camera, renderer.domElement);
		}

		function checkPlayerInsideSphere()
		{
			let model;

			for (let i = 0; i < models.length; i++)
			{
				model = models[i];

				if (camera.position.distanceTo(model.sphere.position) < model.sphere.geometry.parameters.radius * 1.5)
				{
					selected_model = model;

					focusOnModel(selected_model);

					break;
				}
			}

		}

		function update()
		{
			if (current_controller)
			{
				current_controller.update();

				if (current_controller == navigation_controller && state == IDLE && !camera_is_moving)
				{
					checkPlayerInsideSphere();
				}
			}
			if (head)
			{
				if (player.is_playing)
				{
					rotateModel(head, "z");
					rotateModel(angkor, "y");
				}
			}
			render();

			window.requestAnimationFrame(update);
		}

		function render()
		{
			shader_frog_runtime.updateShaders(shader_frog_clock.getElapsedTime());

			renderer.render(scene, camera);
		}

		function updateLayout(event)
		{
			camera.aspect = _this.cont.clientWidth / _this.cont.clientHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(_this.cont.clientWidth, _this.cont.clientHeight);

			render();
		}

		function rotateModel(model, axis)
		{
			model.rotation[axis] += ROTATION_SPEED;
		}

		function selectModel(event)
		{
			if (state == IDLE)
			{
				mouse_pos.x = (event.offsetX / event.target.clientWidth) * 2 - 1;
				mouse_pos.y = -(event.offsetY / event.target.clientHeight) * 2 + 1;

				raycaster.setFromCamera(mouse_pos, camera);

				let intersection = raycaster.intersectObjects(models);

				if (intersection.length != 0)
				{
					selected_model = intersection[0].object;

					if (selected_model.parent.type == "Group")
					{
						selected_model = selected_model.parent;
					}
					focusOnModel(selected_model);
				}
			}
		}

		function focusOnModel(model)
		{
			state = PLAYING_SONG;
			camera_is_moving = true;

			playAudio(model.audio_id);

			for (let i = 0; i < models.length; i++)
			{
				if (models[i] != model)
				{
					models[i].visible = false;
					models[i].sphere.visible = false;
				}
			}
			model.visible = true;
			model.sphere.visible = true;

			toggleSceneInteraction(false);

			current_controller = orbit_controller;

			new window.TinyTween({
				target: model.position,
				from: Object.assign({}, model.position),
				to: { x: zero_v.x, y: zero_v.y, z: model.position.z } ,
				duration: MODEL_FOCUS_IN_DURATION * 1000,
				ease: "easeOutCubic"
			});

			new window.TinyTween({
				target: model.sphere.position,
				from: Object.assign({}, model.sphere.position),
				to: { x: zero_v.x, y: zero_v.y, z: model.sphere.position.z } ,
				duration: MODEL_FOCUS_IN_DURATION * 1000,
				ease: "easeOutCubic"
			});

			new window.TinyTween({
				target: camera.position,
				from: Object.assign({}, camera.position),
				to: model.focused_camera_position,
				duration: MODEL_FOCUS_IN_DURATION * 1000,
				ease: "easeOutCubic"
			});

			new window.TinyTween({
				target: camera.rotation,
				from: { x: camera.rotation.x, y: camera.rotation.y, z: camera.rotation.z },
				to: model.focused_camera_rotation,
				duration: MODEL_FOCUS_IN_DURATION * 1000,
				ease: "easeOutCubic",
				onComplete: () => toggleSceneInteraction(true)
			});

			lobby_screen_button.style.display = "";
		}

		function revertToLobby(event)
		{
			if (state == PLAYING_SONG)
			{
				state = IDLE;
				camera_is_moving = true;

				playAudio(0);

				for (let i = 0; i < models.length; i++)
				{
					models[i].visible = true;
					models[i].sphere.visible = true;
				}
				toggleSceneInteraction(false);

				current_controller = navigation_controller;

				new window.TinyTween({
					target: selected_model.position,
					from: Object.assign({}, selected_model.position),
					to: selected_model.def_position,
					duration: MODEL_FOCUS_IN_DURATION * 1000,
					ease: "easeOutCubic"
				});

				new window.TinyTween({
					target: selected_model.sphere.position,
					from: Object.assign({}, selected_model.sphere.position),
					to: selected_model.def_position,
					duration: MODEL_FOCUS_IN_DURATION * 1000,
					ease: "easeOutCubic"
				});

				new window.TinyTween({
					target: camera.position,
					from: Object.assign({}, camera.position),
					to: def_camera_position,
					duration: MODEL_FOCUS_IN_DURATION * 1000,
					ease: "easeOutCubic"
				});

				new window.TinyTween({
					target: camera.rotation,
					from: { x: camera.rotation.x, y: camera.rotation.y, z: camera.rotation.z },
					to: def_camera_rotation,
					duration: MODEL_FOCUS_IN_DURATION * 1000,
					ease: "easeOutCubic",
					onComplete: () => toggleSceneInteraction(true)
				});

				lobby_screen_button.style.display = "none";
			}
			else
			{
				playAudio(0);
			}
		}

		function toggleSceneInteraction(enable)
		{
			if (enable)
			{
				camera_is_moving = false;

				current_controller.activate();

				if (current_controller == orbit_controller)
				{
					orbit_controller.controls.target.copy(selected_model.focused_camera_target_position);
				}
				renderer.domElement.style.pointerEvents = "";
			}
			else
			{
				current_controller.deactivate();

				renderer.domElement.style.pointerEvents = "none";
			}
		}

		function toggleFullscreen(event)
		{
			document.dispatchEvent(new CustomEvent("toggle_fullscreen"));
		}

	}

}