import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showProjectAllForCreator } from 'actions/project';
import { connect } from 'react-redux'
import ProjectItem from './projectItem';
import _ from 'lodash';
import LoaderThreeDots from 'common/customLoader';
import CustomSearch from 'common/searchComponent';
import { Scrollbars } from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';

import styles from './index.module.scss';

const actions = { showProjectAllForCreator };
const mapStateToProps = ({ user, project }) => ({ user, project });

const Projects = function ({ showProjectAllForCreator, project, user }) {
    const { t } = useTranslation();
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState('');
    const [showOptionLimit, setOptionLimit] = useState(8);
    const ListLength = !_.isEmpty(project.projectList) ? project.projectList.length : 0;

    const loadMoreTasks = () => setOptionLimit(showOptionLimit + 2);

    const handleSearchProjects = event => {
        setSearch(event.target.value);
    };

    const getProjects = async () => {
        await showProjectAllForCreator(user.user.id);
        setProjects(project.projectList);
    }

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <>
            <div className={styles.projectfilters}>
                <CustomSearch
                    placeholder={t('Project name')}
                    search={search}
                    handleSearch={handleSearchProjects}
                />
            </div>
            <Scrollbars
                autoHeight
                autoHeightMin={620}
                autoHeightMax={820}
            >
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMoreTasks}
                    hasMore={ListLength > showOptionLimit}
                    useWindow={false}
                >
                    {
                        _.isEmpty(project.projectList) ? <div className={styles.loader}><LoaderThreeDots height={150} width={200} /></div> :
                            <div>
                                {
                                    !_.isEmpty(project.projectList) &&
                                    _.take(project.projectList, showOptionLimit).map(project => {
                                        return (
                                            project.StakeholderQuery.projectName.toLowerCase().includes(search.toLowerCase()) &&
                                            <ProjectItem
                                                t={t}
                                                key={project.id}
                                                projectData={project}
                                                getProjects={getProjects}
                                            />
                                        )
                                    })
                                }
                            </div>
                    }
                </InfiniteScroll>
            </Scrollbars>
        </>
    )
}

export default memo(connect(mapStateToProps, actions)(Projects));