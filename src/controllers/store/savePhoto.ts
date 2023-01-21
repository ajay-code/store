import sharp from 'sharp'

export async function savePhoto(file: Express.Multer.File) {
    const dirname = 'public/uploads/'
    const filename = (
        Date.now() +
        '-' +
        file.fieldname +
        '.' +
        'webp'
    ).toLocaleLowerCase()

    await sharp(file.buffer)
        .resize(800)
        .toFile(dirname + filename)
    return filename
}
