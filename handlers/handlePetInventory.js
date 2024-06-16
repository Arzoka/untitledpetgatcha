const { PrismaClient } = require('../constants');

const handlePetInventory = {
	async add(userId, pet) {
		const gottenPet = await this.get(userId, pet.id);
		if (!gottenPet) {
			await PrismaClient.pet.create({
				data: {
					PetIdUserId: `${ pet.id }-${ userId }`,
					id: pet.id,
					userId: userId,
					quantity: 1,
					name: pet.name,
					rarity: pet.rarity,
				},
			});
			return;
		}

		await PrismaClient.pet.update({
			where: {
				PetIdUserId: `${ pet.id }-${ userId }`,
			}, data: {
				quantity: {
					increment: 1,
				},
			},
		});
	},

	async remove(userId, pet) {
		const gottenPet = await this.get(userId, pet.id);
		if (!gottenPet) {
			return;
		}

		if (gottenPet.quantity > 1) {
			await PrismaClient.pet.update({
				where: {
					PetIdUserId: `${ pet.id }-${ userId }`,
				}, data: {
					quantity: {
						decrement: 1,
					},
				},
			});
			return;
		}

		await PrismaClient.pet.delete({
			where: {
				PetIdUserId: `${ pet.id }-${ userId }`,
			},
		});
	},

	async get(userId, petId) {

		const uniquePet = await PrismaClient.pet.findUnique({
			where: {
				PetIdUserId: `${ petId }-${ userId }`,
			},
		});

		return uniquePet;
	},

	async getAll(userId) {
		const allPets = await PrismaClient.pet.findMany({
			where: {
				userId: userId,
			},
		});

		return allPets;
	},
};

module.exports = handlePetInventory;
