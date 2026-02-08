<?php
/**
 * Plugin Name: Kitchen Design Canvas
 * Description: Adds a frontend kitchen design canvas with drag-and-drop items, room size controls, and color customization.
 * Version: 1.0.0
 * Author: Design WP Zap
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Kitchen_Design_Canvas_Plugin {
	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) );
		add_shortcode( 'kitchen_design_canvas', array( $this, 'render_shortcode' ) );
	}

	public function enqueue_assets() {
		wp_register_style(
			'kitchen-design-canvas-style',
			plugin_dir_url( __FILE__ ) . 'assets/css/kitchen-design-canvas.css',
			array(),
			'1.0.0'
		);

		wp_register_script(
			'kitchen-design-canvas-script',
			plugin_dir_url( __FILE__ ) . 'assets/js/kitchen-design-canvas.js',
			array(),
			'1.0.0',
			true
		);
	}

	public function render_shortcode() {
		wp_enqueue_style( 'kitchen-design-canvas-style' );
		wp_enqueue_script( 'kitchen-design-canvas-script' );

		ob_start();
		?>
		<div class="kdc-wrapper" data-kdc-root>
			<div class="kdc-panel">
				<h3>Kitchen Designer</h3>
				<div class="kdc-controls">
					<label>
						Room Width (px)
						<input type="number" min="300" max="1400" step="10" value="800" data-kdc-room-width />
					</label>
					<label>
						Room Height (px)
						<input type="number" min="250" max="1000" step="10" value="500" data-kdc-room-height />
					</label>
					<label>
						Room Color
						<input type="color" value="#f8f5ef" data-kdc-room-color />
					</label>
				</div>

				<h4>Drag Items into Kitchen</h4>
				<div class="kdc-toolbox">
					<button type="button" class="kdc-item" draggable="true" data-item-type="Counter">Counter</button>
					<button type="button" class="kdc-item" draggable="true" data-item-type="Sink">Sink</button>
					<button type="button" class="kdc-item" draggable="true" data-item-type="Fridge">Fridge</button>
					<button type="button" class="kdc-item" draggable="true" data-item-type="Stove">Stove</button>
					<button type="button" class="kdc-item" draggable="true" data-item-type="Table">Table</button>
				</div>
			</div>

			<div class="kdc-canvas-wrap">
				<div class="kdc-canvas" data-kdc-canvas>
					<p class="kdc-hint">Drop items here to build your kitchen layout.</p>
				</div>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}
}

new Kitchen_Design_Canvas_Plugin();
