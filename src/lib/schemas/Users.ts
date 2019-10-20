import { Client } from 'klasa';
import { UserSettings } from '../types/settings/UserSettings';

export default Client.defaultUserSchema
	.add(UserSettings.CommandUses, 'Integer', { 'default': 0, 'configurable': false })
	.add(UserSettings.BannerList, 'String', { array: true, configurable: false })
	.add(UserSettings.BadgeList, 'String', { array: true, configurable: false })
	.add(UserSettings.BadgeSet, 'String', { array: true, configurable: false })
	.add(UserSettings.Color, 'Number', { 'default': 0, 'min': 0, 'max': 0xFFFFFF, 'configurable': false })
	.add(UserSettings.Marry, 'User', { array: true, configurable: false })
	.add(UserSettings.Money, 'Float', { 'default': 0, 'min': 0, 'max': 2147483647, 'configurable': false })
	.add(UserSettings.Points, 'Float', { 'default': 0, 'min': 0, 'max': 2147483647, 'configurable': false })
	.add(UserSettings.Reputation, 'Integer', { 'default': 0, 'min': 0, 'max': 32767, 'configurable': false })
	.add(UserSettings.ThemeLevel, 'String', { 'default': '1001', 'configurable': false })
	.add(UserSettings.ThemeProfile, 'String', { 'default': '0001', 'configurable': false })
	.add(UserSettings.TimeDaily, 'Integer', { 'default': 0, 'configurable': false })
	.add(UserSettings.TimeReputation, 'Integer', { 'default': 0, 'configurable': false });