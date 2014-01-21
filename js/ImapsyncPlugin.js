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
Ext.namespace('Zarafa.plugins.imapsync');

/**
 * @class Zarafa.plugins.imapsync.ImapsyncPlugin
 * @extends Zarafa.core.Plugin
 *
 * Imapsync plugin.
 * Allows users to sync a IMAP server from webapp.
 */
Zarafa.plugins.imapsync.ImapsyncPlugin = Ext.extend(Zarafa.core.Plugin, {

	/**
	 * Initialize the plugin by registering to the insertion point
	 * to add something to the right end of the main tab bar.
	 * @protected
	 */
	initPlugin : function()
	{
		Zarafa.plugins.imapsync.ImapsyncPlugin.superclass.initPlugin.apply(this, arguments);

		// Register categories for the settings
		this.registerInsertionPoint('context.settings.categories', this.createSettingsCategory, this);
	},

	/**
	 * Create the delegate {@link Zarafa.settings.ui.SettingsCategory Settings Category}
	 * to the {@link Zarafa.settings.SettingsContext}. This will create new
	 * {@link Zarafa.settings.ui.SettingsCategoryTab tabs} for the
	 * {@link Zarafa.calendar.ui.SettingsImapsyncCategory ImapSync}
	 * in the {@link Zarafa.settings.ui.SettingsCategoryWidgetPanel Widget Panel}.
	 * @param {String} insertionName insertion point name that is currently populated
	 * @param {Zarafa.settings.ui.SettingsMainPanel} settingsMainPanel settings main panel
	 * which is populating this insertion point
	 * @param {Zarafa.settings.SettingsContext} settingsContext settings context
	 * @return {Array} configuration object for the categories to register
	 * @private
	 */
	createSettingsCategory : function(insertionName, settingsMainPanel, settingsContext)
	{
		return {
			xtype : 'zarafa.settingsimapsynccategory',
			settingsContext : settingsContext
		};
	}
});

Zarafa.onReady(function() {
	container.registerPlugin(new Zarafa.core.PluginMetaData({
		name : 'imapsync',
		displayName : _('IMAP Importer'),
		iconPath:"plugins/imapsync/resources/images/sync.png",
		about : Zarafa.plugins.imapsync.ABOUT,
		pluginConstructor : Zarafa.plugins.imapsync.ImapsyncPlugin
	}));
});
