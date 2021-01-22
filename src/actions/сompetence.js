import axios from 'axios';
import { GET_ALL_COMPETENCES } from './types';


export const showCompetenceAll = id => async dispatch => {
    try {
        const res = await axios.get(`/api/competence/showCompetenceAll`, { params: { id } });
        dispatch({
            type: GET_ALL_COMPETENCES,
            payload: res.data
        });
    } catch (error) {
        console.log('showCompetenceAll error:', error);
    }
};

export const createCompetence = (data, id) => async () => {
    try {
        await axios.post(`/api/competence/createCompetence`, data, { params: { id } });

    } catch (error) {
        console.log('createCompetence error:', error);
    }
};

export const changeCompetenceName = (data, id) => async () => {
    try {
        await axios.post(`/api/competence/changeCompetenceName`, data, { params: { id } });

    } catch (error) {
        console.log('changeCompetenceName error:', error);
    }
};
