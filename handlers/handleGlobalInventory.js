const { PrismaClient } = require('../constants');
const isItem = require('../util/isItem');
const isPet = require('../util/isPet');
const getLocalPetData = require('../util/getLocalPetData');
const getLocalItemData = require('../util/getLocalItemData');

// TODO: fix this atrocity of a file, add quantity to add and remove, remove handleItemInventory and handlePetInventory, cleanup all code.
const handleGlobalInventory = {
	async add(userId, entityId) {
		if (isPet(entityId)) {
			const entity = getLocalPetData(entityId);
			await PrismaClient.pet.create({
				data: {
					PetIdUserId: `${ entity.id }-${ userId }`,
					id: entity.id,
					userId: userId,
					quantity: 1,
					name: entity.name,
					rarity: entity.rarity,
				},
			});
		} else if (isItem(entityId)) {
			const entity = getLocalItemData(entityId);
			const gottenItem = await this.get(userId, entityId);
			if (gottenItem) {
				await PrismaClient.items.update({
					where: {
						ItemIdUserId: `${ entity.id }-${ userId }`,
					}, data: {
						quantity: {
							increment: 1,
						},
					},
				});
			} else {
				await PrismaClient.items.create({
					data: {
						ItemIdUserId: `${ entity.id }-${ userId }`,
						id: entity.id,
						userId: userId,
						quantity: 1,
						name: entity.name,
						rarity: entity.rarity,
					},
				});
			}
		}
	},

	async remove(userId, entityId) {
		if (isPet(entityId)) {
			const entity = getLocalPetData(entityId);
			await PrismaClient.pet.delete({
				where: {
					PetIdUserId: `${ entity.id }-${ userId }`,
				},
			});
		} else if (isItem(entityId)) {
			const entity = getLocalItemData(entityId);
			const gottenItem = await this.get(userId, entityId);
			if (gottenItem && gottenItem.quantity > 1) {
				await PrismaClient.items.update({
					where: {
						ItemIdUserId: `${ entity.id }-${ userId }`,
					}, data: {
						quantity: {
							decrement: 1,
						},
					},
				});
			} else if (gottenItem) {
				await PrismaClient.items.delete({
					where: {
						ItemIdUserId: `${ entity.id }-${ userId }`,
					},
				});
			}
		}
	},

	async get(userId, entityId) {
		if (isPet(entityId)) {
			const entity = getLocalPetData(entityId);
			const petId = entity.id;
			const uniquePet = await PrismaClient.pet.findUnique({
				where: {
					PetIdUserId: `${ petId }-${ userId }`,
				},
			});
			return uniquePet;
		} else if (isItem(entityId)) {
			const entity = getLocalItemData(entityId);
			const itemId = entity.id;
			const uniqueItem = await PrismaClient.items.findUnique({
				where: {
					ItemIdUserId: `${ itemId }-${ userId }`,
				},
			});
			return uniqueItem;
		}
	},

	async getAll(userId) {
		const allPets = await PrismaClient.pet.findMany({
			where: {
				userId: userId,
			},
		});

		const allItems = await PrismaClient.items.findMany({
			where: {
				userId: userId,
			},
		});

		return {
			pets: allPets, items: allItems,
		};
	},
};


module.exports = handleGlobalInventory;
