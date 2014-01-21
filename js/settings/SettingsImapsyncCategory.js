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
Ext.namespace('Zarafa.plugins.imapsync.settings');

/**
 * @class Zarafa.plugins.imapsync.settings.SettingsImapsyncCategory
 * @extends Zarafa.settings.ui.SettingsCategory
 * @xtype zarafa.settingsimapsynccategory
 *
 * The imapsync settings category that will allow users to sync a IMAP server
 */
Zarafa.plugins.imapsync.settings.SettingsImapsyncCategory = Ext.extend(Zarafa.settings.ui.SettingsCategory, {
	/**
	 * @constructor
	 * @param {Object} config Configuration object
	 */
	constructor : function(config)
	{
		config = config || {};

		Ext.applyIf(config, {
			title : _('Import IMAP'),
			iconCls : 'icon_imapsync',
			categoryIndex : 9997,
			xtype : 'zarafa.settingsimapsynccategory',
			items : [{
				xtype : 'zarafa.settingsimapsyncwidget',
				settingsContext : config.settingsContext
			}]
		});

		Zarafa.plugins.imapsync.settings.SettingsImapsyncCategory.superclass.constructor.call(this, config);
	}
});

Ext.reg('zarafa.settingsimapsynccategory', Zarafa.plugins.imapsync.settings.SettingsImapsyncCategory);
