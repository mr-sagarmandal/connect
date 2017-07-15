import happybase

def findMatches(skillsDict):
    connection = happybase.Connection('localhost')
    connection.open()
    table2 = connection.table('job')
    results = [];
    for key, value in table2.scan():





def findMatchesForQualifiers(jobQualDict):
    connection = happybase.Connection('localhost')
    table1 = connection.table('resume')
    size = len(jobQualDict)
    candidates = {}
    for email, data in table.scan():
        matches = []
        jobQualDictCopy = jobQualDict
        row = table.row(key, columns = [b'skill'])
        for keys in row:
            currSkill = row[keys]
            for quals in jobQualDictCopy:
                if (currSkill == jobQualDictCopy[quals]):
                    matches.add(currSkill)
                    jobQualDictCopy.pop(currSkill, None)
                    break
        percentage = int(len(matches)/size * 100)
        candidates[email] = {'percentage' : percentage, 'matches' : matches}
    return candidates
