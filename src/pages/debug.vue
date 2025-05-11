<template>
  <Tabs value="1">
    <TabList>
      <Tab value="0">Program</Tab>
      <Tab value="1">ProgramElement</Tab>
    </TabList>

    <!-- PROGRAM -->
    <TabPanel value="0">
      <TabDebugProgram />
    </TabPanel>

    <!-- ELEMENT -->
    <TabPanel value="1">
      <TabDebugProgramElement />
    </TabPanel>
  </Tabs>
</template>
