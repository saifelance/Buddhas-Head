export default class NavigationController
{

	constructor(cont, scene, camera, dom_element, objects)
	{
		objects = objects || [];

		let raycaster;

		let move_forward = false;
		let move_backward = false;
		let move_left = false;
		let move_right = false;
		let can_jump = false;

		let prev_time = performance.now();
		const velocity = new THREE.Vector3();
		const direction = new THREE.Vector3();

		let joystick_button_left;
		let joystick_button_right;
		let joystick_button_forward;
		let joystick_button_backward;

		let camera_def_z = camera.position.z;

		this.active = false;

		raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);

		this.controls = new THREE.PointerLockControls(camera, dom_element);

		this.controls.pointerSpeed = 0.3;

		let joystick_buttons_cont = cont.querySelector(".joystick_buttons_cont");

		if (!window.matchMedia("(any-pointer:coarse)").matches)
		{
			joystick_buttons_cont.remove();
		}
		else
		{
			joystick_button_left = joystick_buttons_cont.querySelector(".joystick_button_left");
			joystick_button_right = joystick_buttons_cont.querySelector(".joystick_button_right");
			joystick_button_forward = joystick_buttons_cont.querySelector(".joystick_button_forward");
			joystick_button_backward = joystick_buttons_cont.querySelector(".joystick_button_backward");

			joystick_buttons_cont.addEventListener("pointerdown", processJoystick);
			joystick_buttons_cont.addEventListener("pointerup", processJoystick);
		}

		function onKeyDown(event)
		{
			switch (event.code)
			{
				case "ArrowUp":
				case "KeyW":
					move_forward = true;
					break;

				case "ArrowLeft":
				case "KeyA":
					move_left = true;
					break;

				case "ArrowDown":
				case "KeyS":
					move_backward = true;
					break;

				case "ArrowRight":
				case "KeyD":
					move_right = true;
					break;

				case "Space":
					if (can_jump === true) velocity.z += 50;
					can_jump = false;
					break;
			}
		}

		function onKeyUp(event)
		{
			switch (event.code)
			{
				case "ArrowUp":
				case "KeyW":
					move_forward = false;
					break;

				case "ArrowLeft":
				case "KeyA":
					move_left = false;
					break;

				case "ArrowDown":
				case "KeyS":
					move_backward = false;
					break;

				case "ArrowRight":
				case "KeyD":
					move_right = false;
					break;
			}
		}

		function processJoystick(event)
		{
			let button = event.target;

			if (event.type == "pointerdown")
			{
				if (button == joystick_button_left)
				{
					move_left = true;
				}
				else if (button == joystick_button_right)
				{
					move_right = true;
				}
				else if (button == joystick_button_forward)
				{
					move_forward = true;
				}
				else if (button == joystick_button_backward)
				{
					move_backward = true;
				}
			}
			else
			{
				move_left = false;
				move_right = false;
				move_forward = false;
				move_backward = false;
			}
		}

		this.activate = function()
		{
			this.active = true;

			this.controls.isLocked = true;

			this.controls.lock();
			this.controls.connect();

			//scene.add(this.controls.getObject());

			document.addEventListener("keydown", onKeyDown);
			document.addEventListener("keyup", onKeyUp);
		}

		this.deactivate = function()
		{
			this.active = false;

			move_forward = false;
			move_backward = false;
			move_left = false;
			move_right = false;

			velocity.x = 0;
			velocity.y = 0;
			velocity.z = 0;

			this.controls.isLocked = false;

			this.controls.unlock();
			this.controls.disconnect();

			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("keyup", onKeyUp);
		}

		this.addObject = function(object)
		{
			objects.push(object);
		}

		this.update = function()
		{
			if (this.active)
			{
				const time = performance.now();

				raycaster.ray.origin.copy(this.controls.getObject().position);
				raycaster.ray.origin.z -= 10;

				const intersections = raycaster.intersectObjects(objects, false);

				const on_object = intersections.length > 0;

				const delta = (time - prev_time) / 1000;

				velocity.x -= velocity.x * 10.0 * delta;
				velocity.y -= velocity.y * 10.0 * delta;

				velocity.z -= 9.8 * 20.0 * delta; // 100.0 = mass

				direction.x = Number(move_right) - Number(move_left);
				direction.y = Number(move_forward) - Number(move_backward);
				direction.normalize(); // this ensures consistent movements in all directions

				if (move_forward || move_backward)
				{
					velocity.y -= direction.y * 200 * delta;
				}
				if (move_left || move_right)
				{
					velocity.x -= direction.x * 200 * delta;
				}

				if (on_object === true)
				{
					velocity.z = Math.max(0, velocity.z);
					can_jump = true;
				}
				this.controls.moveRight(-velocity.x * delta);
				this.controls.moveForward(-velocity.y * delta);

				this.controls.getObject().position.z += (velocity.z * delta); // new behavior

				if (this.controls.getObject().position.z < camera_def_z)
				{
					velocity.z = 0;
					this.controls.getObject().position.z = camera_def_z;

					can_jump = true;
				}
				prev_time = time;
			}
		}

	}


}