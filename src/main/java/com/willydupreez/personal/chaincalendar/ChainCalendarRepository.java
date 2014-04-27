package com.willydupreez.personal.chaincalendar;

import java.util.List;

public interface ChainCalendarRepository {

	public List<ChainCalendar> findAll();
	public ChainCalendar find(String name);

	public void save(ChainCalendar calendar);
	public void delete(ChainCalendar calendar);

}
