/**
 * 공유 유틸리티 함수 및 상수 모음
 * App.jsx에서 분리하여 CityCard 등 여러 컴포넌트에서 재사용 가능하도록 함
 */

import { formatInTimeZone } from 'date-fns-tz';

// ─────────────────────────────────────────────
// 시간대별 도시 상태 정의 테이블
// ─────────────────────────────────────────────
export const STATUS_TABLE = [
  { from: 8,  to: 18, key: 'business', color: '#2ecc71', textKey: 'statusWorking' },
  { from: 18, to: 22, key: 'evening',  color: '#f39c12', textKey: 'statusEvening' },
  { from: 22, to: 24, key: 'night',    color: '#9b59b6', textKey: 'statusNight'   },
  { from: 0,  to: 6,  key: 'night',    color: '#9b59b6', textKey: 'statusNight'   },
  { from: 6,  to: 8,  key: 'morning',  color: '#3498db', textKey: 'statusMorning' },
];

/**
 * 24시간(hour24) 기준으로 해당 시간대의 상태(status, color, textKey)를 반환한다.
 * @param {number} hour24 - 0~23 사이의 정수
 * @returns {object} STATUS_TABLE 항목
 */
export function getStatusByHour(hour24) {
  return (
    STATUS_TABLE.find(({ from, to }) =>
      from < to
        ? hour24 >= from && hour24 < to
        : hour24 >= from || hour24 < to
    ) || STATUS_TABLE[0]
  );
}

/**
 * 주어진 timezone 기준 오늘 자정(00:00:00)의 Date 객체를 반환한다.
 * baseDate 및 timelineDays 계산에서 공통으로 사용.
 * @param {string} timezone - IANA 타임존 문자열 (예: 'Asia/Seoul')
 * @returns {Date}
 */
export function getMidnightOf(timezone) {
  const now       = new Date();
  const dateStr   = formatInTimeZone(now, timezone, 'yyyy-MM-dd');
  const offsetStr = formatInTimeZone(now, timezone, 'XXX');
  return new Date(`${dateStr}T00:00:00${offsetStr}`);
}
