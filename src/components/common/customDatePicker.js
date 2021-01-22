import React, { useEffect, useState, memo } from 'react';
import style from '../main/authentication/signUp.module.scss';
import { CustomSelect } from '../common/customFormComponents/select';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
const day = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
  { value: '14', label: '14' },
  { value: '15', label: '15' },
  { value: '16', label: '16' },
  { value: '17', label: '17' },
  { value: '18', label: '18' },
  { value: '19', label: '19' },
  { value: '20', label: '20' },
  { value: '21', label: '21' },
  { value: '22', label: '22' },
  { value: '23', label: '23' },
  { value: '24', label: '24' },
  { value: '25', label: '25' },
  { value: '26', label: '26' },
  { value: '27', label: '27' },
  { value: '28', label: '28' },
  { value: '29', label: '29' },
  { value: '30', label: '30' },
  { value: '31', label: '31' },
];

const DatePicker = function ({ getParams, title, inputColorMonth, inputСolorDay, inputColorYear, ref, defaultValue, future }) {
  const { t } = useTranslation();
  const [futureYears, setFutureYears] = useState([]);
  const [pastYears, setPastYears] = useState([]);
  const [selectedDay, setSelectedDay] = useState(defaultValue && !_.isEmpty(defaultValue) ? defaultValue[2] : '');
  const [selectedMonth, setSelectedMonth] = useState(defaultValue && !_.isEmpty(defaultValue) ? defaultValue[1] : '');
  const [selectedYear, setSelectedYear] = useState(defaultValue && !_.isEmpty(defaultValue) ? defaultValue[0] : '');
  const month = [
    { value: t("January"), label: t("January"), count: '1' },
    { value: t("February"), label: t("February"), count: '2' },
    { value: t("March"), label: t("March"), count: '3' },
    { value: t("April"), label: t("April"), count: '4' },
    { value: t("May"), label: t("May"), count: '5' },
    { value: t("June"), label: t("June"), count: '6' },
    { value: t("July"), label: t("July"), count: '7' },
    { value: t("August"), label: t("August"), count: '8' },
    { value: t("September"), label: t("September"), count: '9' },
    { value: t("October"), label: t("October"), count: '10' },
    { value: t("November"), label: t("November"), count: '11' },
    { value: t("December"), label: t("December"), count: '12' },
  ];

  useEffect(() => {
    generatePastYear();
    generateFutureYears();
  }, []);

  const generatePastYear = () => {
    const collection = [];
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(101), (val, index) => year - index);
    years.map(e => collection.push({ value: e.toString(), label: e.toString() }));
    setPastYears(collection);
  }
  const generateFutureYears = () => {
    const collection = [];
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(20), (val, index) => year + index);
    years.map(e => collection.push({ value: e.toString(), label: e.toString() }));
    setFutureYears(collection);
  }

  useEffect(() => {
    getParams({
      day: selectedDay,
      month: selectedMonth,
      year: selectedYear,
    });
  }, [selectedYear, selectedMonth, selectedDay]);

  const handleChangeDay = e => setSelectedDay(e.target.value);
  const handleChangeMonth = e => setSelectedMonth(e.target.value);
  const handleChangeYear = e => setSelectedYear(e.target.value);
  
  return (
    <>
      <div className={style.secondInpGroup}>
        {
          title &&
          <h5>{t("Date of birth")}</h5>
        }
        <CustomSelect
          ref={ref}
          value={selectedDay}
          onChange={handleChangeDay}
          options={selectedMonth === '2' ? _.take(day, 28) : day}
          id="day"
          labelId="day-label"
          placeholder={t("Day")}
          error={inputСolorDay}
        />
        <CustomSelect
          ref={ref}
          value={selectedMonth}
          onChange={handleChangeMonth}
          options={month}
          id="month"
          labelId="month-label"
          placeholder={t("Month")}
          error={inputColorMonth}
        />
        <CustomSelect
          ref={ref}
          value={selectedYear}
          onChange={handleChangeYear}
          options={future ? futureYears : pastYears}
          id="years"
          labelId="years-label"
          placeholder={t("Year")}
          error={inputColorYear}
        />
      </div>
    </>
  )
}

export default memo(DatePicker);