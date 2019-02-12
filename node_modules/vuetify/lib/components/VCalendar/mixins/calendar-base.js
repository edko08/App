// Mixins
import mixins from '../../../util/mixins';
import Themeable from '../../../mixins/themeable';
import Colorable from '../../../mixins/colorable';
import Times from './times';
import Mouse from './mouse';
// Util
import props from '../util/props';
import { parseTimestamp, copyTimestamp, getWeekdaySkips, findWeekday, prevDay, updateWeekday, updateFormatted, updateRelative, daysInMonth, createDayList, createNativeLocaleFormatter, DAY_MIN } from '../util/timestamp';
/* @vue/component */
export default mixins(Colorable, Themeable, Times, Mouse).extend({
    name: 'calendar-base',
    props: props.base,
    computed: {
        weekdaySkips: function weekdaySkips() {
            return getWeekdaySkips(this.weekdays);
        },
        parsedStart: function parsedStart() {
            return parseTimestamp(this.start);
        },
        parsedEnd: function parsedEnd() {
            return parseTimestamp(this.end);
        },
        days: function days() {
            return createDayList(this.parsedStart, this.parsedEnd, this.times.today, this.weekdaySkips);
        },
        dayFormatter: function dayFormatter() {
            if (this.dayFormat) {
                return this.dayFormat;
            }
            var options = { timeZone: 'UTC', day: 'numeric' };
            return createNativeLocaleFormatter(this.locale, function (_tms, _short) {
                return options;
            });
        },
        weekdayFormatter: function weekdayFormatter() {
            if (this.weekdayFormat) {
                return this.weekdayFormat;
            }
            var longOptions = { timeZone: 'UTC', weekday: 'long' };
            var shortOptions = { timeZone: 'UTC', weekday: 'short' };
            return createNativeLocaleFormatter(this.locale, function (_tms, short) {
                return short ? shortOptions : longOptions;
            });
        }
    },
    methods: {
        getRelativeClasses: function getRelativeClasses(timestamp) {
            var outside = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            return {
                'v-present': timestamp.present,
                'v-past': timestamp.past,
                'v-future': timestamp.future,
                'v-outside': outside
            };
        },
        getStartOfWeek: function getStartOfWeek(timestamp) {
            var start = copyTimestamp(timestamp);
            findWeekday(start, this.weekdays[0], prevDay);
            updateFormatted(start);
            updateRelative(start, this.times.today, start.hasTime);
            return start;
        },
        getEndOfWeek: function getEndOfWeek(timestamp) {
            var end = copyTimestamp(timestamp);
            findWeekday(end, this.weekdays[this.weekdays.length - 1]);
            updateFormatted(end);
            updateRelative(end, this.times.today, end.hasTime);
            return end;
        },
        getStartOfMonth: function getStartOfMonth(timestamp) {
            var start = copyTimestamp(timestamp);
            start.day = DAY_MIN;
            updateWeekday(start);
            updateFormatted(start);
            return start;
        },
        getEndOfMonth: function getEndOfMonth(timestamp) {
            var end = copyTimestamp(timestamp);
            end.day = daysInMonth(end.year, end.month);
            updateWeekday(end);
            updateFormatted(end);
            return end;
        }
    }
});
//# sourceMappingURL=calendar-base.js.map