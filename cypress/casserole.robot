*** Settings ***
Library             OperatingSystem

*** Test Cases ***

Log Casserole Recipe
    ${receipt}    Get File    ${PATH}
    Log    ${receipt}