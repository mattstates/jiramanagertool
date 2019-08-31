/**
 * @description
 * Takes a jiraDateStamp string and returns
 * "YYYY-MM-DD". EXAMPLE: "2018-08-29T16:46:14.470-0700" => "2018-08-29"
 */
export default function getDateFromJiraTimeStamp(jiraDateStamp: string): string {
    return jiraDateStamp.slice(0, 10);
}
