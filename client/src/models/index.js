import axios from "axios";

const baseUrl = "http://localhost:5000";


export const GetCollocationList = async (tokens) => {
    try {
        const {data} = await axios.post(baseUrl + '/nltk/collocates', {
            tokens: tokens
        })

        return data
    } catch (error) {
        throw error.response.data.message
    }
};

export const GetTokenList = async (text) => {
    try {
        const {data} = await axios.post(baseUrl + '/nltk/tokens', {
            text: text,
        })

        return data
    } catch (error) {
        throw error.response.data.message
    }
}

export const GetTokenListUpload = async (formData) => {
    try {
        const {data} = await axios.post(baseUrl + '/nltk/tokens/upload',
            formData,
        )

        return data
    } catch (error) {
        throw error.response.data.message
    }
}

export const GetConcordanceList = async (tokens, keyword) => {
    try {
        const {data} = await axios.post(baseUrl + '/nltk/concordances', {
            keyword: keyword,
            tokens: tokens
        })

        return data
    } catch (error) {
        throw error.response.data.message
    }
};

export const GetWordFreqList = async (tokens) => {
    try {
        const {data} = await axios.post(baseUrl + '/nltk/word_frequencies', {
            tokens: tokens
        })

        return data
    } catch (error) {
        throw error.response.data.message
    }
};