#import happybase

def findMatches(skillsArr):
    connection = happybase.Connection('localhost')
    connection.open()
    table2 = connection.table('job')
    results = [];
    for key, value in table2.scan():
        companyDict = {};
        matches = []
        companyDict['position'] = table.row(key, 'company:position')
        companyDict['company'] = table.row(key, 'company:name')
        quals=table.row(key,'qualification')
        lengthOfSkillSet = 0;
        for qual in quals :
            lengthOfSkillSet += 1
            for vals in skillsArr:
                if quals[qual] == vals:
                    matches.add(vals)
        companyDict['matches'] = matches
        percentage = int(100 * len(matches)/lengthOfSkillSet)
        companyDict['percentage'] = percentage
        results.add(companyDict)
    return results
