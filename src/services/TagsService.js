class TagsService {

    constructor(tagsRepository) {
        this.tagsRepository = tagsRepository
    }

    async indexTags({ user_id }) {

        const tagIndex = await this.tagsRepository.index({ user_id })

        return tagIndex;
    }

}

module.exports = TagsService