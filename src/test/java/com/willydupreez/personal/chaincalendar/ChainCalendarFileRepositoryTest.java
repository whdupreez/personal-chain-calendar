package com.willydupreez.personal.chaincalendar;

import java.io.File;
import java.net.URISyntaxException;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

import org.junit.Before;
import org.junit.Test;

public class ChainCalendarFileRepositoryTest {

	private final String nonExistentDataDirPath = "/non-existent-db";

	private final String dataDirPath = "/test-db";
	private File dataDir;

	private final String testCalendarName = "test-calendar";

	@Before
	public void before() throws URISyntaxException {
		dataDir = new File(getClass().getResource(dataDirPath).toURI());
	}

	@Test(expected = IllegalArgumentException.class)
	public void test_Null() {
		new ChainCalendarFileRepository(null);
	}

	@Test(expected = IllegalArgumentException.class)
	public void test_DataDirDoesNotExist() {
		new ChainCalendarFileRepository(new File(nonExistentDataDirPath));
	}

	@Test
	public void testFind() {
		ChainCalendarRepository repo = new ChainCalendarFileRepository(dataDir);
		ChainCalendar testCalendar = repo.find(testCalendarName);

		assertThat(testCalendar, is(notNullValue()));
	}

}
