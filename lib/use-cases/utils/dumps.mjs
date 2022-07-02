import config from '../../config.cjs';

export function dumpTalk(talk) {
    const dump = {
        id          : talk.id,
        title       : talk.title,
        description : talk.description,
        posterUrl   : getPhotoUrl(talk.posterUrl),
        createdAt   : talk.createdAt.toISOString(),
        updatedAt   : talk.updatedAt.toISOString()
    };

    return dump;
}

function getPhotoUrl(photo) {
    if (!photo) {
        return '';
    }

    if (photo.includes('http')) {
        return photo;
    }

    return `${config.staticUrl}${photo}`;
}
