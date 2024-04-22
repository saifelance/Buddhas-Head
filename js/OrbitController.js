export default class OrbitController
{

	constructor(camera, dom_element, render)
	{
		this.active = false;

		this.controls = new THREE.OrbitControls(camera, dom_element);

		this.controls.enableDamping = true;
		this.controls.rotateSpeed = 0.1;
		this.controls.enablePan = false;

		this.activate = function()
		{
			this.active = true;

			this.controls.active = true;

			this.controls.activate();
		}

		this.deactivate = function()
		{
			this.active = false;

			this.controls.active = false;

			this.controls.deactivate();
		}

		this.update = function()
		{
			if (this.active)
			{
				this.controls.update();
			}
		}

		/*this.reset = function()
		{
			this.controls.updateCameraTransform();
		}*/

	}

}