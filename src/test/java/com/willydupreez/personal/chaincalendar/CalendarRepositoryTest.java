package com.willydupreez.personal.chaincalendar;

import java.io.File;

import org.junit.Before;
import org.junit.Test;

public class CalendarRepositoryTest {

	private final String dataDirPath = "target/test-db";

	@Before
	public void before() {
		new File(dataDirPath).delete();
	}

	@Test(expected = IllegalArgumentException.class)
	public void test_Null() {
		new CalendarRepository(null);
	}

	@Test(expected = IllegalArgumentException.class)
	public void test_DataDirDoesNotExist() {
		new CalendarRepository(new File("target/test-db"));
	}

}
