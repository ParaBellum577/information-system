import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';
import { getMyTeams, changeTeamName } from 'actions/team';
import TeamComponent from './teamComponent';
import LoaderThreeDots from 'common/customLoader';
import Masonry from 'react-masonry-component';
import CustomSearch from 'common/searchComponent';

import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';

const actions = { getMyTeams, changeTeamName };
const mapStateToProps = ({ user, team }) => ({ user, team });

const Projects = function ({ changeTeamName, getMyTeams, team, user, location }) {

    const [teams, setTeams] = useState([]);
    const [search, setSearch] = useState(location.state.teamName || '');
    const { t } = useTranslation();
    const handleSearch = event => {
        setSearch(event.target.value);
    };
    const getTeams = async () => {
        await getMyTeams(user.user.id);
        setTeams(team.myTeams);
    }
    useEffect(() => {
        getTeams();
    }, []);

    return (
        <>
            <div className={styles.teamWork}>
                <div className={styles.teamWorkHeader}>
                    <CustomSearch
                        placeholder={t('Team Name')}
                        search={search}
                        handleSearch={handleSearch}
                    />
                </div>
                {
                    _.isEmpty(team.myTeams) ? <div className={styles.loader}><LoaderThreeDots height={150} width={200} /></div> :
                        <div className={styles.teamWorkContent}>
                            {
                                !_.isEmpty(team.myTeams) &&
                                <Masonry
                                    className={'teams'}
                                    options={{ transitionDuration: 200 }}
                                >
                                    {
                                        team.myTeams.map(team => (
                                            (team.Team !== null && team.Team.teamName !== null) && 
                                            team.Team.teamName.toLowerCase().includes(search.toLowerCase()) &&
                                            <TeamComponent
                                                key={team.id}
                                                userId={user.user.id}
                                                changeTeamName={changeTeamName}
                                                data={team.Team}
                                                userList={user.userList}
                                                getTeams={getTeams}
                                                t={t}
                                            />
                                        ))
                                    }
                                </Masonry>
                            }
                        </div>
                }
            </div>
        </>
    )
}

export default memo(connect(mapStateToProps, actions)(Projects));