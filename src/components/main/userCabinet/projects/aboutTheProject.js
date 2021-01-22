import React, { useState, useEffect, memo } from 'react';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';
import { connect } from 'react-redux';
import _ from 'lodash';
import EditForm from './editForm';
import styles from './index.module.scss';
const mapStateToProps = ({ user }) => ({ user });

const AboutTheProject = function ({ projectId, user }) {
    // const { t } = useTranslation();

    const [editForm, setEditForm] = useState(false);
    const [currentIdx, setCurrentIdx] = useState(0);

    const handleEditForm = idx => {
        if (currentIdx === idx && editForm) {
            return
        }
        setCurrentIdx(idx);
        setEditForm(!editForm);
    }
    return (
        <div className={styles.projectSettingsAbout}>
            <EditForm
                index={1}
                title="Галузь проекту:"
                description="Механіка.Механіка.Механіка."
                handleEditForm={handleEditForm}
                currentIdx={currentIdx}
                editForm={editForm}
                css={styles.flex}
            />
            <EditForm
                index={2}
                title="Мета реалізації проекту:"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi aperiam amet eveniet cupiditate alias ratione dicta quasi reiciendis repellendus sint dolorum enim possimus minus neque earum debitis explicabo hic, accusamus magnam voluptatem sunt?"
                handleEditForm={handleEditForm}
                currentIdx={currentIdx}
                editForm={editForm}
            />
            <div>
                <h6>Цілі проекту:</h6>
                <div></div>
            </div>
            <EditForm
                index={3}
                title="Конкретні результати/продукція:"
                description="Механіка.Механіка.Механіка."
                handleEditForm={handleEditForm}
                currentIdx={currentIdx}
                editForm={editForm}
                css={styles.flex}
            />
            <EditForm
                index={4}
                title="Потрібне для реалізації  обладнання із списку обладнання ЦІР:"
                description="Механіка.Механіка.Механіка."
                handleEditForm={handleEditForm}
                currentIdx={currentIdx}
                editForm={editForm}
            />
            <EditForm
                index={5}
                title="Можливі споживачі:"
                description="Механіка.Механіка.Механіка."
                handleEditForm={handleEditForm}
                currentIdx={currentIdx}
                editForm={editForm}
                css={styles.flex}
            />
            <EditForm
                index={6}
                title="Декларація про відповідність законодавству та відсутність порушення правових норм/обмежень:"
                description="Механіка.Механіка.Механіка."
                handleEditForm={handleEditForm}
                currentIdx={currentIdx}
                editForm={editForm}
            />

            <h2>Про стейкхолдерів проєкту</h2>
            <div className={styles.doublefroup}>
                <EditForm
                    index={7}
                    title="Представник компанії:"
                    description="Механіка.Механіка.Механіка."
                    handleEditForm={handleEditForm}
                    currentIdx={currentIdx}
                    editForm={editForm}
                    css={styles.flex}
                />
                <EditForm
                    index={8}
                    title="Посада/статус:"
                    description="Механіка.Механіка.Механіка."
                    handleEditForm={handleEditForm}
                    currentIdx={currentIdx}
                    editForm={editForm}
                    css={styles.flex}
                />
            </div>
            <EditForm
                index={9}
                title="Назва компанії/фірми/підприємства"
                description="Механіка"
                handleEditForm={handleEditForm}
                currentIdx={currentIdx}
                editForm={editForm}
                css={styles.flex}
            />
            <div className={styles.doublefroup}>
                <EditForm
                    index={10}
                    title="Тип особи: "
                    description="юр./фіз./ФОП"
                    handleEditForm={handleEditForm}
                    currentIdx={currentIdx}
                    editForm={editForm}
                    css={styles.flex}
                />
                <EditForm
                    index={11}
                    title="Приблизна кількість працівників:"
                    description="22"
                    handleEditForm={handleEditForm}
                    currentIdx={currentIdx}
                    editForm={editForm}
                    css={styles.flex}
                />
            </div>
            <EditForm
                index={12}
                title="Організаційно-правова форма чи рід занять:"
                description="Lorem, ipsum."
                handleEditForm={handleEditForm}
                currentIdx={currentIdx}
                editForm={editForm}
                css={styles.flex}
            />
            <EditForm
                index={13}
                title="Кількість раніше запроваджених інноваційних продуктів:"
                description="2"
                handleEditForm={handleEditForm}
                currentIdx={currentIdx}
                editForm={editForm}
                css={styles.flex}
            />
            <EditForm
                index={14}
                title="Контактна інформація"
                description="Lorem, ipsum dolor."
                handleEditForm={handleEditForm}
                currentIdx={currentIdx}
                editForm={editForm}
            />
        </div>
    )
}

export default memo(connect(mapStateToProps)(AboutTheProject));