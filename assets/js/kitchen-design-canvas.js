(function () {
	'use strict';

	function clamp(value, min, max) {
		return Math.max(min, Math.min(max, value));
	}

	document.querySelectorAll('[data-kdc-root]').forEach(function (root) {
		var canvas = root.querySelector('[data-kdc-canvas]');
		var widthInput = root.querySelector('[data-kdc-room-width]');
		var heightInput = root.querySelector('[data-kdc-room-height]');
		var colorInput = root.querySelector('[data-kdc-room-color]');
		var draggingType = '';
		var activeNode = null;
		var offsetX = 0;
		var offsetY = 0;

		root.querySelectorAll('.kdc-item').forEach(function (tool) {
			tool.addEventListener('dragstart', function (event) {
				draggingType = tool.dataset.itemType || 'Item';
				event.dataTransfer.effectAllowed = 'copy';
				event.dataTransfer.setData('text/plain', draggingType);
			});
		});

		canvas.addEventListener('dragover', function (event) {
			event.preventDefault();
			event.dataTransfer.dropEffect = 'copy';
		});

		canvas.addEventListener('drop', function (event) {
			event.preventDefault();
			var itemType = event.dataTransfer.getData('text/plain') || draggingType;
			if (!itemType) {
				return;
			}

			var rect = canvas.getBoundingClientRect();
			var x = clamp(event.clientX - rect.left - 45, 0, rect.width - 100);
			var y = clamp(event.clientY - rect.top - 18, 0, rect.height - 36);

			var node = document.createElement('div');
			node.className = 'kdc-drop-item';
			node.textContent = itemType;
			node.style.left = x + 'px';
			node.style.top = y + 'px';
			node.setAttribute('draggable', 'false');
			canvas.appendChild(node);
			var hint = canvas.querySelector('.kdc-hint');
			if (hint) {
				hint.style.display = 'none';
			}
		});

		function updateRoomSize() {
			var width = clamp(parseInt(widthInput.value || '800', 10), 300, 1400);
			var height = clamp(parseInt(heightInput.value || '500', 10), 250, 1000);
			canvas.style.width = width + 'px';
			canvas.style.height = height + 'px';
		}

		widthInput.addEventListener('input', updateRoomSize);
		heightInput.addEventListener('input', updateRoomSize);
		updateRoomSize();

		colorInput.addEventListener('input', function () {
			canvas.style.backgroundColor = colorInput.value;
		});

		canvas.addEventListener('mousedown', function (event) {
			if (!event.target.classList.contains('kdc-drop-item')) {
				return;
			}
			activeNode = event.target;
			var nodeRect = activeNode.getBoundingClientRect();
			offsetX = event.clientX - nodeRect.left;
			offsetY = event.clientY - nodeRect.top;
		});

		document.addEventListener('mousemove', function (event) {
			if (!activeNode) {
				return;
			}
			var canvasRect = canvas.getBoundingClientRect();
			var itemRect = activeNode.getBoundingClientRect();
			var x = clamp(event.clientX - canvasRect.left - offsetX, 0, canvasRect.width - itemRect.width);
			var y = clamp(event.clientY - canvasRect.top - offsetY, 0, canvasRect.height - itemRect.height);
			activeNode.style.left = x + 'px';
			activeNode.style.top = y + 'px';
		});

		document.addEventListener('mouseup', function () {
			activeNode = null;
		});
	});
})();
