import FreeSound from 'freesound-client';

require('dotenv').config();

async function main() {
  // Configure API keys with env variables
  const freeSound = new FreeSound();
  freeSound.setToken(process.env.CLIENT_SECRET);
  freeSound.setClientSecrets(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

  // Text Search
  const query = 'violoncello';
  const page = 1;
  const filter = 'tag:tenuto duration:[1.0 TO 15.0]';
  const sort = 'rating_desc';
  const fields = 'id,name,url';
  const search = await freeSound.textSearch(query, {
    page,
    filter,
    sort,
    fields
  });
  console.log(search);

  // Content Search
  const result = await freeSound.contentSearch({
    target: 'lowlevel.pitch.mean:220'
  });
  console.log(result);

  // Getting a user
  const user = await freeSound.getUser('Jovica');
  const [sounds, packs, bookCat, bookCatSounds] = await Promise.all([
    user.sounds(),
    user.packs(),
    user.bookmarkCategories(),
    user.bookmarkCategorySounds()
  ]);
  console.log(user)

  // Getting a soundpack
  const pack = await freeSound.getPack(9678);
  const packSounds = await pack.sounds();
  console.log(packSounds);

  // And many more! See the docs for more API examples:
  // https://github.com/amilajack/freesound-client#usage
}

main();

