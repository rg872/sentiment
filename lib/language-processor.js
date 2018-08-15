var emojis = require('../build/emoji.json');

// English is loaded by default
var enLanguage = require('../languages/en/index');
// Add emojis
Object.assign(enLanguage.labels, emojis);

// Cache loaded languages
var languages = {
    en: enLanguage
};

module.exports = {

    /**
     * Registers the specified language
     *
     * @param {String} languageCode
     *     - Two-digit code for the language to register
     * @param {Object} language
     *     - The language module to register
     */
    addLanguage: function (languageCode, language) {
        if (!language.labels) {
            throw new Error('language.labels must be defined!');
        }
        // Add emojis
        Object.assign(language.labels, emojis);
        languages[languageCode] = language;
    },

    /**
     * Retrieves a language object from the cache,
     * or tries to load it from the set of supported languages
     *
     * @param {String} languageCode - Two-digit code for the language to fetch
     */
    getLanguage: function(languageCode) {
        if (!languageCode) {
            // Default to english if no language was specified
            return languages.en;
        }
        if (!languages[languageCode]) {
            // Try to load specified language
            try {
                // eslint-disable-next-line max-len
                var language = require('../languages/' + languageCode + '/index');
                // Add language to in-memory cache
                this.addLanguage(languageCode, language);
            } catch (err) {
                throw new Error('No language found: ' + languageCode);
            }
        }
        return languages[languageCode];
    },

    /**
     * Returns AFINN-165 weighted labels for the specified language
     *
     * @param {String} languageCode - Two-digit language code
     * @return {Object}
     */
    getLabels: function(languageCode) {
        var language = this.getLanguage(languageCode);
        return language.labels;
    },

    /**
     * Applies a scoring strategy for the current token
     *
     * @param {String} languageCode - Two-digit language code
     * @param {Array} tokens - Tokens of the phrase to analyze
     * @param {int} cursor - Cursor of the current token being analyzed
     * @param {int} tokenScore - The score of the current token being analyzed
     */
    applyScoringStrategy: function(languageCode, tokens, cursor, tokenScore) {
        var language = this.getLanguage(languageCode);
        // Fallback to default strategy if none was specified
        // eslint-disable-next-line max-len
        var scoringStrategy = language.scoringStrategy || defaultScoringStrategy;
        return scoringStrategy.apply(tokens, cursor, tokenScore);
    },

    /**
     * Apply token that have 2 or more words
     *
     * @param {Array} tokens - Tokens of phrase
     * @param {String} languageCode - Two-digit language code
     * @return {Object}
     */
    getCustomTokens: function(tokens, languageCode) {
        var language = this.getLanguage(languageCode);
        let editedTokens = tokens;
        let labelsWords = Object.keys(language.labelsWords);

        editedTokens.forEach((label, tokenIndex) => {
            labelsWords.forEach(labeledWords => {
                let check = true
                let arrayOfLabeledWords = labeledWords.split(' ')
                let removedTokens = arrayOfLabeledWords.length
                for(let [arrayIndex, word] of arrayOfLabeledWords.entries()) {
                    if(word !== editedTokens[tokenIndex + arrayIndex]) {
                        check = false;
                        break;
                    }
                };
                if(check) {
                    editedTokens.splice(tokenIndex, removedTokens, labeledWords)
                }
            });
        });
        return editedTokens;
    },
};

var defaultScoringStrategy = {
    apply: function(tokens, cursor, tokenScore) {
        return tokenScore;
    }
};
