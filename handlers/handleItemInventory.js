const { PrismaClient } = require('../constants');

const handleItemInventory = {
	async add(userId, item) {
		const gottenItem = await this.get(userId, item.id);
		if (!gottenItem) {
			await PrismaClient.items.create({
				data: {
					ItemIdUserId: `${ item.id }-${ userId }`,
					id: item.id,
					userId: userId,
					quantity: 1,
					name: item.name,
					rarity: item.rarity,
				},
			});
			return;
		}

		await PrismaClient.items.update({
			where: {
				ItemIdUserId: `${ item.id }-${ userId }`,
			}, data: {
				quantity: {
					increment: 1,
				},
			},
		});
	},

	async remove(userId, itemId) {
		const gottenItem = await this.get(userId, itemId);
		if (!gottenItem) {
			return;
		}

		if (gottenItem.quantity > 1) {
			await PrismaClient.items.update({
				where: {
					ItemIdUserId: `${ itemId }-${ userId }`,
				}, data: {
					quantity: {
						decrement: 1,
					},
				},
			});
			return;
		}

		await PrismaClient.items.delete({
			where: {
				ItemIdUserId: `${ itemId }-${ userId }`,
			},
		});
	},

	async get(userId, itemId) {

		const uniqueItem = await PrismaClient.items.findUnique({
			where: {
				ItemIdUserId: `${ itemId }-${ userId }`,
			},
		});

		return uniqueItem;
	},

	async getAll(userId) {
		const allItems = await PrismaClient.items.findMany({
			where: {
				userId: userId,
			},
		});

		return allItems;
	},
};

module.exports = handleItemInventory;
