const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const phish = await Band.create({name: "Phish"});
        expect(phish.name).toBe('Phish');
    })
    test('can update a Band', async () => {
        // TODO - test creating a band
        const phish = await Band.create({name: "Phish"});
        await phish.set({genre:"Rock",showCount:300});
        await phish.save()
        expect(phish.genre).toBe('Rock');
        expect(phish.showCount).toBe(300);
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const nujabes = await Musician.create({name: "Nujabes"});
        expect(nujabes.name).toBe('Nujabes');
    })

    test('can update a Musician instance', async () => {
        // TODO - test creating a musician
        const prince = await Musician.create({name: "Prince"});
        await prince.update({instrument: "guitar"});
        await prince.save()
        expect(prince.name).toBe("Prince");
        expect(prince.instrument).toBe("guitar");
    })
   
    test('a Band can have multiple Musicians', async () => {
        // TODO - test creating a musician
        const phish = await Band.create({name : 'Phish', genre : 'Rock'})

		const bob = await Musician.create({name : 'Bob', instrument : 'guitar'});
		const jim = await Musician.create({name : 'Jim', instrument : 'voice' });
		
		await phish.addMusician(bob)
		await phish.addMusician(jim)

		const musicians = await phish.getMusicians() 
		expect(musicians.length).toBe(2)
		expect(musicians[1] instanceof Musician).toBeTruthy
    })
    test('can add musicians to a band', async () => {
        
        const phish = await Band.create({name : 'Phish', genre : 'Rock'})
        const spoon = await Band.create({name : 'Spoon', genre : 'Rock'})
		const bob = await Musician.create({name : 'Bob', instrument : 'guitar'});
		const jim = await Musician.create({name : 'Jim', instrument : 'voice' });
		
		await phish.addMusician(bob)
        await spoon.addMusician(jim)
        let foundBand = await Band.findAll()
        
        expect(spoon.getMusicians()).toBeTruthy();
        expect(phish.getMusicians()).toBeTruthy();
      
    })
    test('can add songs to band and vice versa', async () => {
        
        const phish = await Band.create({name : 'Phish', genre : 'Rock'})
        const spoon = await Band.create({name : 'Spoon', genre : 'Rock'})
		const perfect = await Song.create({title : 'Perfect', year : 1990});
        const hello = await Song.create({title : 'Hello', year : 1999});
		
		await phish.addSong(perfect)
        await spoon.addSong(hello)
        const phishBand = await Band.findByPk(1)
        await phishBand.addSong(1)
        const helloSong = await Song.findByPk(2)
        await helloSong.addBand(2)
        const phishSongs = await phishBand.getSongs()
        const helloBand = await helloSong.getBands()
        console.log(helloBand)
        expect(helloBand[0].name).toBe('Spoon');
        expect(phishSongs[0].title).toBe('Perfect');
      
    })
})