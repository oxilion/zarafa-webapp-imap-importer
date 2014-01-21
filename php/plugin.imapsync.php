<?php
/*    Copyright 2014 Oxilion B.V.
 *
 *    This file is part of Zarafa WebApp IMAP Importer
 *
 *    Zarafa WebApp IMAP Importer is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU Affero General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    Zarafa WebApp IMAP Importer is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with Zarafa WebApp IMAP Importer.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Imapsync plugin.
 *
 * Allows to sync a IMAP server from webapp.
 *
 * Author: Oxilion B.V. <info@oxilion.nl>
 */

class Pluginimapsync extends Plugin {

	public function __construct() {}

	/**
	 * Function initializes the Plugin and registers all hooks
	 */
	function init() {
		$this->registerHook('server.core.settings.init.before');
	}

	/**
	 * Function is executed when a hook is triggered by the PluginManager
	 *
	 * @param string $eventID the id of the triggered hook
	 * @param mixed $data object(s) related to the hook
	 */
	function execute($eventID, &$data) {
		switch($eventID) {
			case 'server.core.settings.init.before' :
				$this->injectPluginSettings($data);
				break;
		}
	}

	/**
	 * Called when the core Settings class is initialized and ready to accept sysadmin default
	 * settings.
	 * @param Array $data Reference to the data of the triggered hook
	 */
	function injectPluginSettings(&$data) {
		$data['settingsObj']->addSysAdminDefaults(Array(
			'zarafa' => Array(
				'v1' => Array(
					'plugins' => Array(
						'imapsync' => Array(
							'enable'            => PLUGIN_IMAPSYNC_USER_DEFAULT_ENABLE
						)

					)
				)
			)
		));
	}
}
?>
